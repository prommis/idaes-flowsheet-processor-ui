"""Regression tests for replacing uploaded Python modules in a running backend."""

import importlib
import os
from pathlib import Path
import py_compile
import sys
from tempfile import TemporaryDirectory
from types import ModuleType, SimpleNamespace
import unittest
from unittest.mock import patch

from fastapi import HTTPException
from pyomo.environ import value
from tinydb import TinyDB
from tinydb.storages import MemoryStorage

from idaes_flowsheet_processor.api import FlowsheetInterface
from idaes_flowsheet_processor_ui.internal.flowsheet_manager import FlowsheetManager


class TestCustomFlowsheetReload(unittest.TestCase):
    helper_name = "_reupload_test_helper"
    model_name = "_reupload_test_model"
    ui_name = "_reupload_test_model_ui"
    other_ui_name = "_reupload_test_other_ui"

    def setUp(self):
        temporary_dir = TemporaryDirectory()
        self.addCleanup(temporary_dir.cleanup)
        self.root = Path(temporary_dir.name)
        self.upload_dir = self.root / "custom_flowsheets"
        self.upload_dir.mkdir()

        search_path = patch.object(sys, "path", [str(self.upload_dir), *sys.path])
        search_path.start()
        self.addCleanup(search_path.stop)
        self.addCleanup(self._remove_test_modules)

        self.manager = FlowsheetManager(initialize=False)
        self.manager.custom_flowsheets_path = self.upload_dir
        self.manager.app_settings = SimpleNamespace(data_basedir=self.root)
        self.manager._objs = {}
        self.manager._flowsheets = {}
        self.manager._histdb = TinyDB(storage=MemoryStorage)
        self.addCleanup(self.manager._histdb.close)
        self.files = [
            f"{self.helper_name}.py",
            f"{self.model_name}.py",
            f"{self.ui_name}.py",
        ]

    def _remove_test_modules(self):
        for name in (
            self.helper_name, self.model_name, self.ui_name, self.other_ui_name
        ):
            sys.modules.pop(name, None)
        importlib.invalidate_caches()

    def _write_sources(self, helper_value=1, model_offset=0, label="original"):
        (self.upload_dir / self.files[0]).write_text(f"VALUE = {helper_value}\n")
        (self.upload_dir / self.files[1]).write_text(
            "from pyomo.environ import Block, ConcreteModel, Var\n"
            f"from {self.helper_name} import VALUE\n"
            f"OFFSET = {model_offset}\n"
            "def build(**kwargs):\n"
            "    model = ConcreteModel()\n"
            "    model.fs = Block()\n"
            "    model.fs.output = Var(initialize=VALUE + OFFSET)\n"
            "    return model\n"
        )
        (self.upload_dir / self.files[2]).write_text(
            "from idaes_flowsheet_processor.api import FlowsheetInterface\n"
            f"from {self.model_name} import build\n"
            "def export_to_ui():\n"
            f"    return FlowsheetInterface(name={label!r}, do_build=build,\n"
            "        do_export=lambda **kwargs: None, do_solve=lambda **kwargs: None)\n"
        )

    def _upload(self):
        return self.manager.add_custom_flowsheet(self.files, self.ui_name)

    def _build_value(self, module_name=None):
        interface = self.manager.get_obj(module_name or self.ui_name)
        interface.build()
        return value(interface.fs_exp.obj.output)

    def test_reupload_replaces_exporter_model_and_helper(self):
        bundled_interface = FlowsheetInterface(
            name="bundled", do_build=lambda: None,
            do_export=lambda **kwargs: None, do_solve=lambda **kwargs: None,
        )
        self.manager.add_flowsheet_interface("bundled.example", bundled_interface)
        installed_dependency = sys.modules["pyomo.environ"]

        self._write_sources()
        self.assertEqual(self._upload(), "success")
        self.assertEqual(self._build_value(), 1)
        previous_interface = self.manager.get_obj(self.ui_name)

        self._write_sources(helper_value=2, model_offset=10, label="updated")
        self.assertEqual(self._upload(), "success")
        self.assertEqual(self._build_value(), 12)
        self.assertEqual(self.manager.get_info(self.ui_name).name, "updated")
        self.assertIsNot(self.manager.get_obj(self.ui_name), previous_interface)
        self.assertIs(self.manager.get_obj("bundled.example"), bundled_interface)
        self.assertIs(sys.modules["pyomo.environ"], installed_dependency)

    def test_reupload_ignores_same_size_same_timestamp_bytecode(self):
        self._write_sources()
        self.assertEqual(self._upload(), "success")
        helper = self.upload_dir / self.files[0]
        stat = helper.stat()
        py_compile.compile(
            str(helper), doraise=True,
            invalidation_mode=py_compile.PycInvalidationMode.TIMESTAMP,
        )

        helper.write_text("VALUE = 2\n")
        self.assertEqual(helper.stat().st_size, stat.st_size)
        os.utime(helper, ns=(stat.st_atime_ns, stat.st_mtime_ns))

        self.assertEqual(self._upload(), "success")
        self.assertEqual(self._build_value(), 2)

    def test_shared_model_is_reloaded_once_for_all_exporters(self):
        self._write_sources()
        other_exporter = self.upload_dir / f"{self.other_ui_name}.py"
        other_exporter.write_text((self.upload_dir / self.files[2]).read_text())
        self.assertEqual(self._upload(), "success")

        self._write_sources(helper_value=3)
        self.assertEqual(self._upload(), "success")
        self.assertEqual(self._build_value(), 3)
        self.assertEqual(self._build_value(self.other_ui_name), 3)
        self.assertIs(
            sys.modules[self.ui_name].build,
            sys.modules[self.other_ui_name].build,
        )

    def test_failed_reupload_does_not_keep_old_callable(self):
        self._write_sources()
        self.assertEqual(self._upload(), "success")
        (self.upload_dir / self.files[2]).write_text("def broken(:\n")

        self.assertIsInstance(self._upload(), SyntaxError)
        self.assertNotIn(self.ui_name, self.manager._flowsheets)
        with self.assertRaises(HTTPException):
            self.manager.get_obj(self.ui_name)

    def test_invalid_interface_is_reported_as_upload_failure(self):
        self._write_sources()
        (self.upload_dir / self.files[2]).write_text("def export_to_ui(): return None\n")

        self.assertIsInstance(self._upload(), ValueError)
        self.assertNotIn(self.ui_name, self.manager._objs)

    def test_remove_then_upload_same_name_uses_new_code(self):
        self._write_sources()
        self.assertEqual(self._upload(), "success")
        self.manager.remove_custom_flowsheet(self.ui_name)

        with self.assertRaises(HTTPException):
            self.manager.get_obj(self.ui_name)
        self.assertNotIn(self.model_name, sys.modules)
        self.assertNotIn(self.helper_name, sys.modules)

        self._write_sources(helper_value=4)
        self.assertEqual(self._upload(), "success")
        self.assertEqual(self._build_value(), 4)

    def test_name_collision_does_not_reload_or_use_external_module(self):
        self._write_sources()
        external = ModuleType(self.ui_name)
        external.__file__ = str(self.root / "installed_exporter.py")
        sys.modules[self.ui_name] = external

        self.assertIsInstance(self._upload(), ImportError)
        self.assertIs(sys.modules[self.ui_name], external)
        self.assertNotIn(self.ui_name, self.manager._objs)


if __name__ == "__main__":
    unittest.main()

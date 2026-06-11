import sys
import os
import uvicorn
import multiprocessing
import idaes.logger as idaeslog
import argparse

## Put DeferredImportCallbackFinder at the end of sys.meta_path list
DeferredImportCallbackFinder = [finder for finder in sys.meta_path if "pyomo.common.dependencies" in repr(finder)]
if len(DeferredImportCallbackFinder) > 0:
    DeferredImportCallbackFinder=DeferredImportCallbackFinder[0]
    sys.meta_path[:] = [finder for finder in sys.meta_path if "pyomo.common.dependencies" not in repr(finder)]
    sys.meta_path.append(DeferredImportCallbackFinder)

_log = idaeslog.getLogger(__name__)

from fastapi import FastAPI
from idaes_flowsheet_processor_ui.routers import flowsheets
from fastapi.middleware.cors import CORSMiddleware



app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(flowsheets.router)


@app.get("/")
async def root():
    return {"message": "Hello FastAPI"}

if __name__ == "__main__":
    multiprocessing.freeze_support()
    parser = argparse.ArgumentParser()
    parser.add_argument("-i", "--install_idaes_extensions", action="store_true", help="Install IDAES extensions.")
    parser.add_argument("-p", "--production", action='store_true', help="Run backend in production mode.")
    args = parser.parse_args()
    run_in_production_mode = args.production
    install_extensions = args.install_idaes_extensions
    if install_extensions:
        from idaes_flowsheet_processor_ui.internal.get_extensions import get_idaes_extensions
        _log.info("="*60)
        _log.info("INSTALLATION PHASE STARTED")
        _log.info(f"Current process ID: {os.getpid()}")
        _log.info(f"Active process count at start: {multiprocessing.active_children().__len__()}")
        _log.info("running get_extensions()")
        
        try:
            get_idaes_extensions()
            _log.info("get_extensions() completed successfully")
        except Exception as e:
            _log.error(f"Failed to install extensions: {e}", exc_info=True)
            _log.info(f"Active process count at error: {multiprocessing.active_children().__len__()}")
            sys.exit(1)
        
        # Diagnostic logging after get_idaes_extensions completes
        active_children = multiprocessing.active_children()
        _log.info(f"Active process count after get_extensions(): {active_children.__len__()}")
        for child in active_children:
            _log.info(f"  - Child process: {child.name} (PID: {child.pid}, daemon: {child.daemon})")
        
        _log.info("extensions installation complete, exiting")
        _log.info("="*60)
        sys.exit(0)
    elif run_in_production_mode:
        _log.info("="*60)
        _log.info("PRODUCTION MODE STARTED")
        _log.info(f"Current process ID: {os.getpid()}")
        _log.info(f"Starting backend in production mode")
        _log.info("="*60)
        # multiprocessing.freeze_support()
        uvicorn.run(app, host="127.0.0.1", port=8001, reload=False)
    else:
        _log.info("="*60)
        _log.info("DEV MODE STARTED")
        _log.info(f"Current process ID: {os.getpid()}")
        _log.info(f"Starting backend in dev mode")
        _log.info("="*60)
        # multiprocessing.freeze_support()
        uvicorn.run("__main__:app", host="127.0.0.1", port=8001, reload=True)

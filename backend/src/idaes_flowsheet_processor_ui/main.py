import sys
import os
import uvicorn
import multiprocessing
import argparse

# Try to set spawn method to fork on macOS for better multiprocessing compatibility
if hasattr(multiprocessing, 'get_context'):
    try:
        multiprocessing.set_start_method('fork', force=True)
    except RuntimeError:
        pass  # Already set

## Put DeferredImportCallbackFinder at the end of sys.meta_path list
DeferredImportCallbackFinder = [finder for finder in sys.meta_path if "pyomo.common.dependencies" in repr(finder)]
if len(DeferredImportCallbackFinder) > 0:
    DeferredImportCallbackFinder=DeferredImportCallbackFinder[0]
    sys.meta_path[:] = [finder for finder in sys.meta_path if "pyomo.common.dependencies" not in repr(finder)]
    sys.meta_path.append(DeferredImportCallbackFinder)

# Import logger early (needed before any logging)
import idaes.logger as idaeslog
_log = idaeslog.getLogger(__name__)

# Defer heavy imports until needed
_FastAPI = None
_flowsheets = None
_CORSMiddleware = None
_get_idaes_extensions = None

def get_app():
    """Lazy load FastAPI app to avoid side effects on import"""
    global _FastAPI, _flowsheets, _CORSMiddleware, app
    
    if _FastAPI is None:
        from fastapi import FastAPI
        from idaes_flowsheet_processor_ui.routers import flowsheets
        from fastapi.middleware.cors import CORSMiddleware
        
        _FastAPI = FastAPI
        _flowsheets = flowsheets
        _CORSMiddleware = CORSMiddleware
    
    app = _FastAPI()
    
    app.add_middleware(
        _CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    
    app.include_router(_flowsheets.router)
    
    @app.get("/")
    async def root():
        return {"message": "Hello FastAPI"}
    
    return app

# Don't create app until needed
app = None

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
            # Terminate any remaining child processes before exit
            for child in multiprocessing.active_children():
                _log.warning(f"Terminating child process: {child.name} (PID: {child.pid})")
                child.terminate()
            sys.stdout.flush()
            sys.stderr.flush()
            os._exit(1)
        
        # Diagnostic logging after get_idaes_extensions completes
        active_children = multiprocessing.active_children()
        _log.info(f"Active process count after get_extensions(): {active_children.__len__()}")
        for child in active_children:
            _log.info(f"  - Child process: {child.name} (PID: {child.pid}, daemon: {child.daemon})")
        
        # Terminate any remaining child processes before exit
        for child in active_children:
            _log.warning(f"Force-terminating child process before exit: {child.name} (PID: {child.pid})")
            child.terminate()
        
        _log.info("extensions installation complete, exiting")
        _log.info("="*60)
        _log.info("Calling os._exit(0) now...")
        sys.stdout.flush()
        sys.stderr.flush()
        os._exit(0)
    elif run_in_production_mode:
        _log.info("="*60)
        _log.info("PRODUCTION MODE STARTED")
        _log.info(f"Current process ID: {os.getpid()}")
        _log.info(f"Starting backend in production mode")
        _log.info("="*60)
        app = get_app()
        uvicorn.run(app, host="127.0.0.1", port=8001, reload=False)
    else:
        _log.info("="*60)
        _log.info("DEV MODE STARTED")
        _log.info(f"Current process ID: {os.getpid()}")
        _log.info(f"Starting backend in dev mode")
        _log.info("="*60)
        app = get_app()
        uvicorn.run(app, host="127.0.0.1", port=8001, reload=True)

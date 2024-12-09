from pathlib import Path
import os
import certifi

idaes_extensions_dir = Path.home() / ".nawi" / ".idaes"

def check_for_idaes_extensions():
    print('checking for idaes extensions')
    found_extensions = os.path.exists(idaes_extensions_dir)
    print(f'found extensions: {found_extensions}')
    return found_extensions

def get_idaes_extensions():
    print('inside get idaes extensions')
    try:
        try:
            print(f'setting requests_ca_bundle and ssl_cert_file to certifi.where(): {certifi.where()}')
            os.environ["REQUESTS_CA_BUNDLE"] = certifi.where()
            os.environ["SSL_CERT_FILE"] = certifi.where()
        except Exception as e:
            print(f'unable to set requests_ca_bundle and ssl_cert_file:\n{e}')
        print(f'trying to download binaries')
        from idaes_flowsheet_processor_ui.internal.download_binaries import download_binaries
        binaries_release_version="3.4.0"
        try:
            from idaes.config import default_binary_release
            binaries_release_version = default_binary_release
            print(f"got default binary release: {binaries_release_version}")
        except Exception as e:
            print(f"unable to get default binary release, rolling with {binaries_release_version}")
        download_binaries(release=binaries_release_version)
        print('successfully installed idaes extensions')
    except PermissionError as e:
        print(f'unable to install extensions, permissionerror due to idaes extensions already being present: {e}\nmaking directory')
        idaes_extensions_dir.mkdir(parents=True, exist_ok=True)
        return False
    except Exception as e:
        print(f'unable to install extensions: {e}')
        return False
    idaes_extensions_dir.mkdir(parents=True, exist_ok=True)
    return True
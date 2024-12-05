from setuptools import setup, find_packages


setup(
    name="idaes-flowsheet-processor-ui",
    author="WaterTAP UI developers",
    license="LICENSE",

    version="1.0.0",

    package_dir={"": "backend/src"},
    packages=find_packages(include=("backend/src",),),

    install_requires=[
        "pytest>=7",
        "aiofiles==23.2.1",
        "anyio==3.6.1",
        "asgiref==3.5.2",
        "certifi==2021.10.8",
        "click==8.1.3",
        "fastapi==0.110.0",
        "flexparser != 0.4",
        "h11==0.13.0",
        "idaes-pse",
        "idna==3.3",
        "pydantic==2.6.4",
        "pydantic-settings==2.2.1",
        "python-multipart==0.0.5",
        "chardet",
        "pyyaml",
        "requests",
        "tinydb",
        "sniffio==1.2.0",
        "typing_extensions==4.9.0",
        "uvicorn==0.17.6",
        "importlib_resources==5.9.0",
        "idaes_flowsheet_processor @ git+https://github.com/watertap-org/idaes-flowsheet-processor.git",
    ],

    entry_points={
        "watertap.flowsheets": [
        ],
    }
)

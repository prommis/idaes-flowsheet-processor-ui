from setuptools import setup, find_packages


setup(
    name="idaes-flowsheet-processor-ui",
    author="WaterTAP UI developers",
    license="LICENSE",

    version="22.9.9",

    package_dir={"": "backend/src"},
    packages=find_packages(where="backend/src"),

    install_requires=[
        "pytest>=7",
    ],

    entry_points={
        "watertap.flowsheets": [
        ],
    }
)

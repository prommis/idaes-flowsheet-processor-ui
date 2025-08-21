# idaes-flowsheet-processor-ui

This repository is for work on the user interface (UI) for the IDAES Flowsheet Processor.
The UI installer can be downloaded from our homepage at: https://prommis.github.io/

[Documentation website](https://prommis.github.io/idaes-flowsheet-processor-ui/)

## Getting started (developer)

### Prerequisites

The following steps assume that:

1. `conda` is already installed and configured
2. This repository (i.e. https://github.com/watertap-org/idaes-flowsheet-processor-ui) has been cloned locally and the working directory is set to the root of the repository

## Installation

### 1. Creating the Conda environment

Run the following command to create and activate a new Conda environment named `flowsheet-processor-env`:

```sh
conda env create --file environment.yml && conda activate flowsheet-processor-env
```

This will install the correct runtime versions of both the backend (Python) and frontend (NodeJS) portions of the UI, as well as the backend (Python) dependencies.

### 2. Install the JavaScript dependencies

Run the following command to install the JavaScript dependencies:

```sh
npm --prefix frontend clean-install
```

### 3. Install the IDAES solver dependencies

```sh
idaes get-extensions --verbose
```

### 4. (Optional) Install parent package with default flowsheets

Each parent package (IDAES, WaterTAP, and PROMMIS) has a list of default flowsheets. To add these flowsheets to the UI, simply install the parent package (in your working environment).

For WaterTAP:

```sh
pip install watertap
```

For IDAES:

```sh
pip install idaes-pse
```

For PROMMIS:

```sh
pip install prommis
```
# Changing default UI settings

The user can adjust web address for the backend end, and location of databases created by the backend through react .env file. The defaults rarely needs changing but can be adjusted by:

1. create a file called '.env.local' in 'frontend' folder. This file will not be tracked by git. 
2. Add the following into the file and adjust options as needed (these are also defautls in the current .env file)
   
    # Back end host:port
    # This address must match the address specified in backend\src\idaes_flowsheet_processor_ui\main.py
    REACT_APP_BACK_END_URL = http://localhost:8001
    # Database location - this stores where flowsheet data is kept, default location is user home found via Path.home()
    REACT_APP_BACKEND_DATABASE_LOCATION = user_home

# Running the UI

### Ensure that the `flowsheet-processor-env` Conda environment is active and all dependencies are installed

```console
conda activate flowsheet-processor-env
```

### Run UI in browser

```console
cd <idaes-flowsheet-processor-ui-path>/frontend
npm run app-start
```

# Running developer tests

There are three sets of tests that can be run: Python tests, JavaScript unit tests, and JavaScript end-to-end tests.

## Running Python tests

From the repository root directory run:

To run:
```shell
cd backend/src/idaes_flowsheet_processor_ui
pytest
```

This will take several minutes since one set of tests solves the UI flowsheets.

## Running JS unit tests

The unit tests are written using the [testing-library](https://testing-library.com/) package.

To run:
```shell
cd frontend
npm run test
```

Hit 'a' for "run all tests" if you want to run tests regardless of what changed.

## Running JS E2E tests

The end-to-end tests are written in Cypress.

Before running the tests, start the app, in another process (or shell):
```shell
cd frontend
npm run app-start
```

Then, to run the tests:
```shell
cd frontend
npx cypress run
```

If there are errors, screenshots and videos can be found (in subdirectories named for each test) under `electron/ui/cypress/screenshots` and `electron/ui/cypress/videos`.

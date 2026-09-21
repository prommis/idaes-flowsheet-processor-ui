# idaes-flowsheet-processor-ui

This repository is for work on the user interface (UI) for the IDAES Flowsheet Processor.
The UI installer can be downloaded from our [download site](https://prommis.github.io/idaes-flowsheet-processor-ui/docs/Download/watertap).

For information on using the UI, check out our [Documentation website](https://prommis.github.io/idaes-flowsheet-processor-ui/).

## Getting started (developer)

### Prerequisites

The following steps assume that:

1. `conda` is already installed and configured
2. This repository (i.e. https://github.com/watertap-org/idaes-flowsheet-processor-ui) has been cloned locally and the working directory is set to the root of the repository

### Node and npm versions

| Tool | Recommended version | Supported versions |
| --- | --- | --- |
| Node.js | 22.23.2 | >=22.12.0 and <23 |
| npm | 10.9.8 | >=10.8.1 and <11 |

These requirements apply to the root package, `frontend/`, and `website/`.
The root package's build tooling requires Node 22.12.0 or newer, so the former
Node 22.3.0 environment is no longer supported for development across the repository.
Each package declares the supported ranges in `engines`, and its `.npmrc` enables
`engine-strict` so incompatible installs stop with an `EBADENGINE` error.

Conda is the default way to install Node alongside Python. The `packageManager`
field records the recommended npm version, but ordinary npm commands do not
automatically select it; the setup commands below select it explicitly.

## Installation

### 1. Creating the Conda environment

Run the following command to create and activate a new Conda environment named `flowsheet-processor-env`:

```sh
conda env create --file environment.yml && conda activate flowsheet-processor-env
```

This will install the correct runtime versions of both the backend (Python) and frontend (NodeJS) portions of the UI, as well as the backend (Python) dependencies.

For an existing environment, activate it and update Node:

```sh
conda activate flowsheet-processor-env
conda install -c conda-forge nodejs=22.23.2
```

### 2. Install the JavaScript dependencies

With the environment active, select the recommended npm version and install the
JavaScript dependencies from the committed lockfile:

```sh
npm install --global npm@10.9.8
node --version
npm --version
npm --prefix frontend ci
```

The version commands should print `v22.23.2` and `10.9.8` for the recommended
setup. If they do not, check which Node installation your shell is using before
continuing. Avoid using `--force` to bypass an `EBADENGINE` error.

Use `npm ci` for routine setup; use `npm install` when intentionally changing
dependencies and commit the resulting lockfile. The frontend, root tooling, and
documentation site have separate lockfiles. The UI only needs the frontend install
above; use `npm ci` at the repository root for root tooling or
`npm --prefix website ci` for the documentation site.

#### Optional: use nvm for Node

If you already use [nvm](https://github.com/nvm-sh/nvm), `.nvmrc` selects the same
Node version as Conda. From the repository root, after activating your backend
Conda environment, run:

```sh
nvm install
nvm use
npm install --global npm@10.9.8
npm --prefix frontend ci
```

nvm is optional and selects Node; npm is selected separately by the command above.
On native Windows, use the Conda setup. Recheck `node --version` and
`npm --version` after switching or reactivating environments.

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

CI checks clean installs and the frontend build with the minimum supported
Node/npm pair and the latest Node 22/npm 10 releases on Linux, Windows, and macOS.
The app and documentation workflows use the recommended versions.
When changing the recommended versions, update `environment.yml`, `.nvmrc`, the
three `packageManager` fields, and the setup instructions together. If changing
the supported ranges, also update the three `engines` fields, their lockfile
metadata, and the minimum versions in `.github/workflows/node-compatibility.yml`.

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

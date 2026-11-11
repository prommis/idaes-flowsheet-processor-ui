# README for docs

All commands assume you are in the `website/` subdirectory on the
main branch.

## Install node packages

First follow the [Node and npm setup instructions](../README.md#node-and-npm-versions).
The recommended versions are Node 22.23.2 and npm 10.9.8. This directory enforces
the same supported version ranges as the frontend and root package.

```
npm ci
```

## Development

Before starting development, make sure to install the required node packages by running `npm ci` in the `website/` directory. Then, start the development server:

```
npx docusaurus start
```

## Testing and Deployment

Before testing and deploying, ensure that the node packages are installed by running `npm ci` in the `website/` directory.

Deploy to gh-pages:

```
GIT_USER=<username> npm run deploy
```

Test deployment locally:

```
npm run build
npm run serve
```

## More info

Docusaurus documentation links:
- [Getting started](https://docusaurus.io/docs/category/getting-started)
- [Deployment](https://docusaurus.io/docs/deployment)

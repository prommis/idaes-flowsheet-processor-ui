const { defineConfig } = require("cypress");
const { loadEnv } = require("vite");
const {downloadFile} = require('cypress-downloadfile/lib/addPlugin');

const env = loadEnv(process.env.NODE_ENV || "development", __dirname, "");
const vitePort = Number(env.VITE_PORT) || 3069;

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {downloadFile});
    },
    baseUrl: `http://localhost:${vitePort}`,
    video: false
  },
});

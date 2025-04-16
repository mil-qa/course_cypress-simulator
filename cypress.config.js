const { defineConfig } = require("cypress");
const cySplit = require("cypress-split");

module.exports = defineConfig({
  projectId: "kz9rdq",
  viewportHeight: 1024,
  viewportWidth: 1700,
  e2e: {
    fixturesFolder: false,
    setupNodeEvents(on, config) {
      cySplit(on, config);
      return config;
    },
  },
});

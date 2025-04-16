const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "kz9rdq",
  viewportHeight: 1024,
  viewportWidth: 1700,
  e2e: {
    fixturesFolder: false,
  },
});

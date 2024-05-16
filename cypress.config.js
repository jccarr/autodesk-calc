const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    supportFile: 'cypress/support/component.js',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

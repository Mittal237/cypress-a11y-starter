const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    video: false,
    pageLoadTimeout: 120000,       
    defaultCommandTimeout: 15000,
    chromeWebSecurity: false,
    experimentalSessionAndOrigin: true
  },
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'mochawesome-report',
    overwrite: false,
    html: true,
    json: true,
    reportFilename: '[status]-[datetime]-[name]'
  }
});

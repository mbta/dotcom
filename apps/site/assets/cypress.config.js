/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
module.exports = {
  trashAssetsBeforeRuns: true,

  env: {
    failSilently: false
  },

  chromeWebSecurity: false,

  e2e: {
    // can be overridden by the CYPRESS_BASE_URL environment variable
    // https://docs.cypress.io/guides/references/configuration#Environment-Variables
    baseUrl: "http://localhost:4002",

    setupNodeEvents(on, config) {
      on("task", {
        // recommended for cypress-axe logging
        log(message) {
          console.log(message);

          return null;
        },
        table(message) {
          console.table(message);

          return null;
        }
      });
    }
  }
};

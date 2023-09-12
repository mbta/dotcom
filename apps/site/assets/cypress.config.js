/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const port = process.env.PORT;
if (!port) {
  throw new Error(`missing PORT environment variable`);
}
module.exports = {
  screenshotsFolder: "cypress/snapshots/actual",
  trashAssetsBeforeRuns: true,

  env: {
    failSilently: false
  },

  video: false,
  chromeWebSecurity: false,

  e2e: {
    baseUrl: `http://localhost:${port}`,

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

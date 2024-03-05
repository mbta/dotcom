const port = process.env.PORT;
module.exports = {
  trashAssetsBeforeRuns: true,

  env: {
    failSilently: false,
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
      })
    }
  },
};

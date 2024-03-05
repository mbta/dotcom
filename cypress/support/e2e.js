// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import "./../../assets/node_modules/cypress-file-upload";
import "./../../assets/node_modules/cypress-iframe";
import "./../../assets/node_modules/cypress-axe";
import "./commands";

Cypress.Screenshot.defaults({
  capture: "fullPage",
  disableTimersAndAnimations: false
});

Cypress.on("uncaught:exception", (err, runnable) => {
  // Catch known third-party test failures

  // from leaflet/react-leaflet on the schedule pages
  // https://mbtace.sentry.io/issues/4903788314/
  if (err.message.includes("Cannot read properties of undefined (reading '_leaflet_pos')")) {
    return false
  }

  // from Google Translate's JS library
  if (err.message.includes("Failed to execute 'createElement' on 'Document': The tag name provided ('[object Arguments]') is not a valid name.") || /translate_http/.test(err.stack)) {
    return false
  }

  // we still want to ensure there are no other unexpected
  // errors, so we let them fail the test
})

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

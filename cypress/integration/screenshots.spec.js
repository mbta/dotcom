/** Take and compare screenshots of pages and elements.
 * If it goes well it might be the basis for some regression tests!
 */

describe.skip("Screenshots look good:", () => {
  afterEach(() => {
    cy.takeFullScreenshot();
  });
  
  [
    "/",
    "/stops/subway"
  ]
  .forEach((url) => {
    it(url, () => { cy.visit(url) });
  });
});

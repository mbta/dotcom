// Presets from https://docs.cypress.io/api/commands/viewport#Arguments
const viewports = [
  "iphone-6",
  "ipad-2",
  "macbook-16"
]

const SELECTORS = {
  schedulesTab: "a[data-tab-type='schedules']",
  tripplannerTab: "a[data-tab-type='trip-planner']",
  alertsTab: "a[data-tab-type='alerts']"
}

describe("Tabbed navigation", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  viewports.forEach(viewport => {
    describe(`${viewport} size`, () => {
      beforeEach(() => {
        cy.viewport(viewport);
        cy.injectAxe();
      });

      it("has no a11y errors", () => {
        cy.checkA11y();
        cy.get(SELECTORS.tripplannerTab).click();
        cy.checkA11y();
        cy.get(SELECTORS.alertsTab).click();
        cy.checkA11y();
        cy.get(SELECTORS.schedulesTab).click();
        cy.checkA11y();
      });

      it("shows expected content on tab click", () => {
        cy.get("#schedules-content").should("be.visible");
        cy.get("#trip-planner-content").should("not.be.visible");
        cy.get("#alerts-content").should("not.be.visible");
        cy.get(SELECTORS.tripplannerTab).click();
        cy.get("#schedules-content").should("not.be.visible");
        cy.get("#trip-planner-content").should("be.visible");
        cy.get("#alerts-content").should("not.be.visible");
        cy.get(SELECTORS.alertsTab).click();
        cy.get("#schedules-content").should("not.be.visible");
        cy.get("#trip-planner-content").should("not.be.visible");
        cy.get("#alerts-content").should("be.visible");
        cy.get(SELECTORS.schedulesTab).click();
        cy.get("#schedules-content").should("be.visible");
        cy.get("#trip-planner-content").should("not.be.visible");
        cy.get("#alerts-content").should("not.be.visible");
      });
    })
  });
});

const viewports = [
  "iphone-6",
  "ipad-2"
]

const searchPlaceholderText = "Search for routes, info, and more";

describe("Navigation redesign - mobile menu", () => {
  beforeEach(() => {
    cy.enableFlaggedFeature("nav_redesign");
    cy.visit("/");

    /* setting up some aliases */
    cy.get("button.m-menu__toggle").as("menuButton");
    cy.get("button.header-search__toggle").as("searchButton");
    cy.get(".m-menu__cover").as("veil");
    cy.get(".m-menu__content").as("menu");
  });

  describe("has no detectable a11y violations", () => {
    beforeEach(() => {
      cy.injectAxe();
    });

    it("on load", () => {
      cy.checkA11y();
    });
    
    it("with menu open", () => {
      cy.get("@menuButton").click();
      cy.checkA11y();
    });

    it("with search open", () => {
      cy.viewport("iphone-6");
      cy.get("@searchButton").click();
      cy.checkA11y();
    });
  });

  viewports.forEach(viewport => {
    describe(`${viewport} size`, () => {
      beforeEach(() => {
        cy.viewport(viewport);
      });

      it("button toggles the mobile menu", () => {
        cy.get(".m-menu__content").should("not.be.visible");
        cy.get("@menuButton").click();
        cy.get("@menuButton").should("contain", "Close");
        cy.get(".m-menu__content").should("be.visible");
        cy.get("@menuButton").click();
        cy.get("@menuButton").should("contain", "Menu");
        cy.get(".m-menu__content").should("not.be.visible")
      });

      it("ESC key closes open menu", () => {
        cy.get("@menu").should("not.be.visible");
        cy.get("@menuButton").click();
        cy.get("@menu").should("be.visible");
        cy.get("@menuButton").should("contain", "Close");
        cy.get("body").type("{esc}");
        cy.get("@menu").should("not.be.visible");
        cy.get("@menuButton").should("contain", "Menu");
      });

      /* specific to tablet view only */
      if (viewport != "iphone-6") {
        it("click veil closes the mobile menu", () => {
          cy.get("@menu").should("not.be.visible");
          cy.get("@menuButton").click();
          cy.get("@menu").should("be.visible");
          cy.get("@menuButton").should("contain", "Close");
          cy.get("@veil").click();
          cy.get("@menu").should("not.be.visible");
          cy.get("@menuButton").should("contain", "Menu");
        })
      }

      /* search behaves differently between two smallest viewports */
      if (viewport == "iphone-6") {
        it("search button toggles search bar", () => {
          cy.get(".m-menu__search").should("not.be.visible");
          cy.get("@searchButton").click();
          cy.get(".header").should("have.class", "search-open");
          cy.get("@menuButton").should("not.be.visible");
          cy.get("input#search-header-desktop__input")
            .should("not.be.visible")
          cy.get("input#search-header-mobile__input")
            .should("be.visible")
            .should("have.attr", "placeholder", searchPlaceholderText);
          cy.get("@searchButton").click();
          cy.get(".header").should("not.have.class", "search-open");
          cy.get(".m-menu__search").should("not.be.visible");
        });
      } else {
        it("search bar is visible", () => {
          cy.get("input#search-header-mobile__input")
            .should("not.be.visible")
          cy.get("input#search-header-desktop__input")
            .should("be.visible")
            .should("have.attr", "placeholder", searchPlaceholderText);

          cy.get("@searchButton").should("not.be.visible");
        });
      }
    })
  });

  it("isn't visible in larger viewports", {
    viewportWidth: 1200
  }, () => {
    cy.get("@menu").should("not.be.visible");
    cy.get("@menuButton").should("not.be.visible");
    cy.get(".header input#search-header-mobile__input").should("not.be.visible");
  });
});

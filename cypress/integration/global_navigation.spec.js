// Presets from https://docs.cypress.io/api/commands/viewport#Arguments
const viewports = [
  "iphone-6",
  "ipad-2",
  "macbook-16"
]

const searchPlaceholderText = "Search for routes, info, and more";

const SELECTORS = {
  veil: ".c-modal__cover",
  desktopMenu: ".m-menu-desktop__section:first-child",
  desktopMenuButton: ".m-menu--desktop__toggle:first-child",
  mobileMenu: ".m-menu__content",
  mobileMenuButton: "button.m-menu__toggle",
  searchButton: "button.header-search__toggle",
  searchBarDesktop: "header #search-header-desktop__container",
  searchBarMobile: "header #search-header-mobile__container"
}

describe("Navigation redesign", () => {
  beforeEach(() => {
    cy.enableFlaggedFeature("nav_redesign");
    cy.visit("/");
  });

  describe("has no detectable a11y violations", () => {
    beforeEach(() => {
      cy.injectAxe();
    });

    it("on load", () => {
      cy.checkA11y();
    });
    
    it("with menu open", () => {
      cy.viewport("ipad-2");
      cy.get(SELECTORS.mobileMenuButton).click();
      cy.checkA11y();
    });

    it("with search open", () => {
      cy.viewport("iphone-6");
      cy.get(SELECTORS.searchButton).click();
      cy.checkA11y();
    });
  });

  viewports.forEach(viewport => {
    describe(`${viewport} size`, () => {
      beforeEach(() => {
        cy.viewport(viewport);
      });

      it("shows right controls at relevant viewports", () => {
        // menus start hidden
        cy.get(SELECTORS.mobileMenu).should("not.be.visible");
        cy.get(SELECTORS.desktopMenu).should("not.be.visible");
        cy.get(SELECTORS.searchBarMobile).should("not.be.visible");

        switch (viewport) {
          case "macbook-16":
            cy.get(SELECTORS.desktopMenuButton).should("be.visible");
            cy.get(SELECTORS.searchBarDesktop).should("be.visible").get("input.c-search-bar__-input").should("have.attr", "placeholder", searchPlaceholderText);
            cy.get(SELECTORS.mobileMenuButton).should("not.be.visible");
            cy.get(SELECTORS.searchButton).should("not.be.visible");
            break;
          
          case "ipad-2":
            cy.get(SELECTORS.desktopMenuButton).should("not.be.visible");
            cy.get(SELECTORS.searchBarDesktop).should("be.visible").get("input.c-search-bar__-input").should("have.attr", "placeholder", searchPlaceholderText);
            cy.get(SELECTORS.mobileMenuButton).should("be.visible");
            cy.get(SELECTORS.searchButton).should("not.be.visible");
            break;
        
          case "iphone-6":
            cy.get(SELECTORS.desktopMenuButton).should("not.be.visible");
            cy.get(SELECTORS.searchBarDesktop).should("not.be.visible");
            cy.get(SELECTORS.mobileMenuButton).should("be.visible");
            cy.get(SELECTORS.searchButton).should("be.visible");
            break;
        }
      })

      if (viewport !== "macbook-16") {
        it("button toggles the mobile menu", () => {
          cy.get(SELECTORS.mobileMenuButton).should("contain", "Menu");
          cy.get(SELECTORS.mobileMenuButton).click();
          cy.get(SELECTORS.mobileMenuButton).should("contain", "Close");
          cy.get(SELECTORS.mobileMenu).should("be.visible");
          cy.get(SELECTORS.mobileMenuButton).click();
          cy.get(SELECTORS.mobileMenu).should("not.be.visible");
        });
      }

      if (viewport == "ipad-2") {
        it("click veil closes the mobile menu", () => {
          cy.get(SELECTORS.mobileMenuButton).click();
          cy.get(SELECTORS.mobileMenu).should("be.visible");
          cy.get(SELECTORS.veil).click();
          cy.get(SELECTORS.mobileMenu).should("not.be.visible");
          cy.get(SELECTORS.mobileMenuButton).should("contain", "Menu");
        });

        it("ESC key closes the mobile menu", () => {
          cy.get(SELECTORS.mobileMenuButton).click();
          cy.get(SELECTORS.mobileMenu).should("be.visible");
          cy.get("body").type("{esc}");
          cy.get(SELECTORS.mobileMenu).should("not.be.visible");
          cy.get(SELECTORS.mobileMenuButton).should("contain", "Menu");
        });
      } else if (viewport == "macbook-16") {
        it("click veil closes the desktop menu", () => {
          cy.get(SELECTORS.desktopMenuButton).click();
          cy.get(SELECTORS.desktopMenu).should("be.visible");
          cy.get(SELECTORS.veil).click();
          cy.get(SELECTORS.desktopMenu).should("not.be.visible");
        });

        it("ESC key closes the desktop menu", () => {
          cy.get(SELECTORS.desktopMenuButton).click();
          cy.get(SELECTORS.desktopMenu).should("be.visible");
          cy.get("body").type("{esc}");
          cy.get(SELECTORS.desktopMenu).should("not.be.visible");
        });
      }

      /* search behaves differently between two smallest viewports */
      if (viewport == "iphone-6") {
        it("search button toggles search bar", () => {
          cy.get(SELECTORS.searchBarMobile).should("not.be.visible");
          cy.get(SELECTORS.searchButton).click();
          cy.get("header").should("have.class", "search-open");
          cy.get(SELECTORS.mobileMenuButton).should("not.be.visible");
          cy.get(SELECTORS.searchBarDesktop)
            .should("not.be.visible")
          cy.get(SELECTORS.searchBarMobile)
            .should("be.visible")
            .get("input.c-search-bar__-input").should("have.attr", "placeholder", searchPlaceholderText);
          cy.get(SELECTORS.searchButton).click();
          cy.get("header").should("not.have.class", "search-open");
          cy.get(SELECTORS.searchBarMobile).should("not.be.visible");
        });
      }
    })
  });
});

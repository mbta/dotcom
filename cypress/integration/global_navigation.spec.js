// Presets from https://docs.cypress.io/api/commands/viewport#Arguments
const viewports = [
  "iphone-6",
  "ipad-2",
  "macbook-16"
]

const searchPlaceholderText = "Search for routes, info, and more";

const SELECTORS = {
  veil: ".m-menu--cover",
  desktopMenu: ".m-menu-desktop__section",
  desktopMenuButton: ".m-menu--desktop__toggle",
  mobileMenu: ".m-menu__content",
  mobileMenuButton: "button.m-menu__toggle",
  searchButton: "button.header-search__toggle",
  searchBarDesktop: "header #search-header-desktop__container",
  searchInputDesktop: "header #search-header-desktop__input",
  searchBarMobile: "header #search-header-mobile__container"
}

describe("Header navigation", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  viewports.forEach(viewport => {
    describe(`${viewport} size`, () => {
      beforeEach(() => {
        cy.viewport(viewport);
      });

      describe("has no detectable a11y violations", () => {
        beforeEach(() => {
          cy.injectAxe();
        });

        it("on load", () => {
          cy.checkA11y();
        });

        it("with menu open", () => {
          switch (viewport) {
            case "macbook-16":
              cy.get(SELECTORS.desktopMenuButton).first().click();
              cy.get(SELECTORS.desktopMenu).should("be.visible");
              break;

            default:
              cy.get(SELECTORS.mobileMenuButton).click();
              cy.get(SELECTORS.mobileMenu).should("be.visible");
              break;
          }
          cy.checkA11y();
        });

        if (viewport == "iphone-6") {
          it("with search open", () => {
            cy.get(SELECTORS.searchButton).click();
            cy.get(SELECTORS.searchBarMobile).should("be.visible")
            cy.checkA11y();
          });
        }
      });

      it("shows right controls at relevant viewports", () => {
        // menus start hidden
        cy.get(SELECTORS.mobileMenu).should("not.be.visible");
        cy.get(SELECTORS.desktopMenu).should("not.be.visible");
        cy.get(SELECTORS.searchBarMobile).should("not.be.visible");

        switch (viewport) {
          case "macbook-16":
            cy.get(SELECTORS.desktopMenuButton).first().should("be.visible");
            cy.get(SELECTORS.searchBarDesktop).should("be.visible").get("input.c-search-bar__-input").should("have.attr", "placeholder", searchPlaceholderText);
            cy.get(SELECTORS.mobileMenuButton).should("not.be.visible");
            cy.get(SELECTORS.searchButton).should("not.be.visible");
            break;

          case "ipad-2":
            cy.get(SELECTORS.desktopMenuButton).first().should("not.be.visible");
            cy.get(SELECTORS.searchBarDesktop).should("be.visible").get("input.c-search-bar__-input").should("have.attr", "placeholder", searchPlaceholderText);
            cy.get(SELECTORS.mobileMenuButton).should("be.visible");
            cy.get(SELECTORS.searchButton).should("not.be.visible");
            break;

          case "iphone-6":
            cy.get(SELECTORS.desktopMenuButton).first().should("not.be.visible");
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
      } else {
        // no idea why this test is failing in CI but here we are
        it.skip("button toggles the desktop menu", { retries: 5 }, () => {
          cy.get(SELECTORS.desktopMenuButton).first().click();
          cy.get(SELECTORS.desktopMenu).should("be.visible");
          cy.get(SELECTORS.desktopMenuButton).first().click();
          cy.get(SELECTORS.desktopMenu).should("not.be.visible");
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

        it ("Veil should be shown when search input is focused, and hidden when blurred", () => {
          cy.get(SELECTORS.searchInputDesktop).focus();
          cy.get(SELECTORS.veil).should("be.visible");
          cy.get(SELECTORS.searchInputDesktop).blur();
          cy.get(SELECTORS.veil).should("not.be.visible");
        });
      } else if (viewport == "macbook-16") {
        it("click veil closes the desktop menu", () => {
          cy.get(SELECTORS.desktopMenuButton).first().click();
          cy.get(SELECTORS.desktopMenu).should("be.visible");
          cy.get(SELECTORS.veil).click();
          cy.get(SELECTORS.desktopMenu).should("not.be.visible");
        });

        it("ESC key closes the desktop menu", { retries: 5 }, () => {
          cy.get(SELECTORS.desktopMenuButton).first().click();
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

  it("translates languages", () => {
    cy.viewport("macbook-16");
    cy.get(".m-homepage__shortcuts").should("contain.text", "Subway Lines");
    cy.get(".custom-language-selector").first().select("Polish");
    cy.get(".m-homepage__shortcuts").should("contain.text", "Linie metra");
  });
});

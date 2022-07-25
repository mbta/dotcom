// Presets from https://docs.cypress.io/api/commands/viewport#Arguments
const viewports = [
  "iphone-6",
  "ipad-2",
  "macbook-16"
]

const searchPlaceholderText = "Search for routes, info, and more";

describe("Header navigation", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  viewports.forEach(viewport => {
    describe(`${viewport} size`, () => {
      beforeEach(() => {
        cy.viewport(viewport);
        cy.get("button.m-menu__toggle").as('mobileMenuButton')
        cy.get(".m-menu__content").as('mobileMenu')
        cy.get(".m-menu--desktop__toggle").first().as('desktopMenuButton')
        cy.get(".m-menu-desktop__section").as('desktopMenu')
        cy.get("button.header-search__toggle").as('searchButton');
        cy.get("header #search-header-mobile__container").as('searchBarMobile')
        cy.get("header #search-header-desktop__container").as('searchBarDesktop')
        cy.get("header #search-header-desktop__input").as('searchInputDesktop')
        cy.get(".m-menu--cover").as('veil')

        if (viewport === "macbook-16") {
          cy.wait(500); // desktop stuff takes longer to render
        }
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
              cy.get('@desktopMenuButton')
                .click()
                .wait(500) // let the menu finish expanding
                .then(() => {
                  cy.get('@desktopMenu').should("be.visible");
                });

              break;

            default:
              cy.get('@mobileMenuButton')
                .click()
                .then(() => {
                  cy.get('@mobileMenu').should("be.visible");
                });
              break;
          }
          cy.checkA11y();
        });

        if (viewport == "iphone-6") {
          it("with search open", () => {
            cy.get('@searchButton')
              .click()
              .then(() => {
                cy.get('@searchBarMobile').should("be.visible");
              })

            cy.checkA11y();
          });
        }
      });

      it("shows right controls at relevant viewports", () => {
        // menus start hidden
        cy.get('@mobileMenu').should("not.be.visible");
        cy.get('@desktopMenu').should("not.be.visible");
        cy.get('@searchBarMobile').should("not.be.visible");

        switch (viewport) {
          case "macbook-16":
            /// shows 4 desktop menu buttons & search bar
            cy.get('@desktopMenuButton').should("be.visible");
            cy.get('@searchBarDesktop').should("be.visible")
              .get("input.c-search-bar__-input").should("have.attr", "placeholder", searchPlaceholderText);
            cy.get('@mobileMenuButton').should("not.be.visible");
            cy.get('@searchBarMobile').should("not.be.visible");
            break;

          case "ipad-2":
            // shows singular "Menu" button & search bar
            cy.get('@desktopMenuButton').should("not.be.visible");
            cy.get('@searchBarDesktop').should("be.visible")
              .get("input.c-search-bar__-input").should("have.attr", "placeholder", searchPlaceholderText);
            cy.get('@mobileMenuButton').should("be.visible");
            cy.get('@searchBarMobile').should("not.be.visible");
            cy.get('@searchButton').should("not.be.visible");
            break;

          case "iphone-6":
            // shows singular "Menu" button & search button
            cy.get('@desktopMenuButton').should("not.be.visible");
            cy.get('@searchBarDesktop').should("not.be.visible");
            cy.get('@mobileMenuButton').should("be.visible");
            cy.get('@searchBarMobile').should("not.be.visible");
            cy.get('@searchButton').should("be.visible");
            break;
        }
      })

      if (viewport !== "macbook-16") {
        it("button toggles the mobile menu", () => {
          cy.get('@mobileMenuButton')
            .should("contain", "Menu")
            .click()
            .should("contain", "Close")
            .then(() => {
              cy.get('@mobileMenu').should("be.visible");
            })
          cy.get('@mobileMenuButton')
            .click()
            .should("contain", "Menu")
            .then(() => {
              cy.get('@mobileMenu').should("not.be.visible");
            });
        });
      } else {
        it("button toggles the desktop menu", () => {
          cy.get('@desktopMenuButton')
            .click()
            .wait(500) // let the menu finish expanding
            .then(() => {
              cy.get('@desktopMenu').should("be.visible");
            });
          cy.get('@desktopMenuButton')
            .click()
            .then(() => {
              cy.get('@desktopMenu').should("not.be.visible");
            });
        });
      }

      if (viewport == "ipad-2") {
        it("click veil closes the mobile menu", () => {
          cy.get('@mobileMenuButton').click();
          cy.get('@veil')
            .click()
            .then(() => {
              cy.get('@mobileMenu').should("not.be.visible");
              cy.get('@mobileMenuButton').should("contain", "Menu");
            })
        });

        it("ESC key closes the mobile menu", () => {
          cy.get('@mobileMenuButton').click()
          cy.get("body")
            .type("{esc}")
            .then(() => {
              cy.get('@mobileMenu').should("not.be.visible");
              cy.get('@mobileMenuButton').should("contain", "Menu");
            });
        });

        it("Veil should be shown when search input is focused, and hidden when blurred", () => {
          cy.get('@searchInputDesktop')
            .focus()
            .then(() => {
              cy.get('@veil').should("be.visible");
            });
          cy.get('@searchInputDesktop').blur()
            .then(() => {
              cy.get('@veil').should("not.be.visible");
            })
        });
      } else if (viewport == "macbook-16") {
        it("click veil closes the desktop menu", () => {
          cy.get('@desktopMenuButton')
            .click()
            .wait(500); // let the menu finish expanding

          cy.get('@veil')
            .click()
            .then(() => {
              cy.get('@desktopMenu').should("not.be.visible");
            });
        });

        it("ESC key closes the desktop menu", () => {
          cy.get('@desktopMenuButton')
            .click()
            .wait(500); // let the menu finish expanding

          cy.get("body")
            .type("{esc}")
            .then(() => {
              cy.get('@desktopMenu').should("not.be.visible");
            });
        });
      }

      /* search behaves differently between two smallest viewports */
      if (viewport == "iphone-6") {
        it("search button toggles search bar", () => {
          cy.get('@searchBarMobile').should("not.be.visible");
          cy.get('@searchButton')
            .click()
            .then(() => {
              cy.get("header").should("have.class", "search-open");
              cy.get('@mobileMenuButton').should("not.be.visible");
              cy.get('@searchBarDesktop').should("not.be.visible")
              cy.get('@searchBarMobile')
                .should("be.visible")
                .get("input.c-search-bar__-input").should("have.attr", "placeholder", searchPlaceholderText);
            });

          cy.get('@searchButton')
            .click()
            .then(() => {
              cy.get("header").should("not.have.class", "search-open");
              cy.get('@searchBarMobile').should("not.be.visible");
            });
        });
      }
    })
  });

  it("translates languages", () => {
    cy.viewport("macbook-16");
    cy.get(".m-homepage__shortcuts")
      .should("contain.text", "Subway Lines");
    cy.get(".custom-language-selector")
      .first()
      .select("Polish")
      .then(() => {
        cy.wait(1000); // translating is slow!
        cy.get(".m-homepage__shortcuts").should("contain.text", "Linie metra");
      })
  });
});

/**
 * This test goes to almost every page a typical user would visit. Tests will
 * fail if the page responds in a server error or a 404 error, or if any of the
 * endpoints called in the background during the test fail. This group of tests
 * is intended to be shallow, with more in-depth functionality tested elsewhere.
 *
 * More testing done on critical user journeys, in the Playwright end-to-end
 * testing scenarios.
 */
describe("passes smoke test", () => {
  /**
   *  Homepage tabs and navigation are covered in other tests, so we don't test
   *  those here. Here just checks the relevant content is available.
   */
  it("home page", () => {
    cy.visit("/");
    cy.get("main").within(() => {
      cy.contains("Find a Location");
      cy.contains("Contact Us");
      cy.contains("Ferry One-Way");
      cy.get("#whats-happening-promoted > div").should("have.length", 2);
      if (Cypress.config("baseUrl").includes("mbta.com")) {
        // these are skipped on dev environments because the test CMS has no events
        cy.contains("Upcoming Public Meetings and Events");
        cy.get("li.m-event").should("have.length.greaterThan", 0);
      }
      cy.contains("Press Releases");
      cy.get("a.m-homepage__news-item").should("have.length.greaterThan", 0);
      cy.contains("MBTA User Guides");
      cy.get(".user-guides .guide").should("have.length.greaterThan", 0);
      cy.contains("Important Links");
      cy.get(".m-homepage__important-link").should("have.length", 8);
    });
  });

  it("fares by mode", () => {
    cy.visit("/fares");
    cy.get(".c-fare-card").should("have.length", 6);
    cy.visit("/fares/commuter-rail-fares");
    cy.visit("/fares/bus-fares");
    cy.visit("/fares/subway-fares");
    cy.visit("/fares/ferry-fares");
  });

  it("fares sales locations", () => {
    cy.visit("/fare-transformation/proposed-sales-locations");
    cy.wait(1000);
    cy.get('input[placeholder="Enter a location"]').type("Boston Common");
    cy.get(".c-search-bar__autocomplete-results .aa-List").should("have.length.greaterThan", 0);
    cy.get(".c-search-bar__autocomplete-results .aa-List li")
      .first()
      .click();
    cy.url().should("contain", "address=Boston");
    cy.get(".c-sales-locations__card").should("have.length.greaterThan", 0);

    cy.visit("/fares/retail-sales-locations");
    cy.get('input[placeholder="Enter a location"]').type("Harvard Square");
    cy.get(".c-search-bar__autocomplete-results .aa-List li").should("have.length.greaterThan", 0);
    cy.get(".c-search-bar__autocomplete-results .aa-List li")
      .first()
      .click();
    cy.url().should("contain", "address=Harvard+Square");
    cy.get(".c-sales-locations__card").should("have.length.greaterThan", 0);
  });

  it("events page, selected event, add to calendar", () => {
    cy.visit("/events");
    cy.visit("/events?month=10&year=2023");
    cy.get(".m-event__title a")
      .last()
      .click({ force: true });
    cy.contains("Meeting Info");
    cy.contains("Event Description");
    cy.contains("a", "Add to Calendar")
      .invoke("attr", "href")
      .then(href => {
        cy.request(href)
          .its("status")
          .should("eq", 200);
      });
  });

  it("projects page, filter, selected project", () => {
    cy.visit("/projects");
    cy.wait(1000);
    cy.get("#mode-button__bus").click();
    cy.contains("Bus Projects");
    cy.get(".m-more-projects-table__title")
      .last()
      .click();
  });

  it("news page, selected news entry", () => {
    cy.visit("/news");
    cy.get("a.news-entry-title")
      .first()
      .click();
  });

  it("stops & stations page, selected station", () => {
    cy.visit("/stops");
    cy.get(".tab-select-btn-group")
      .contains("Ferry")
      .click();
    cy.contains("a.m-detailed-stop", "Hingham").click();
    cy.wait(1000);
    cy.url().should("contain", "Boat-Hingham");
    cy.contains("main", "Stop Information");
  });

  it("schedules & maps page (all links)", () => {
    cy.visit("/schedules");
    cy.get("main a").each(a => {
      cy.get(a)
        .invoke("attr", "href")
        .then(href => {
          cy.request(href); // passes if 200 or 3**
        });
    });
  });

  it("selected schedules", () => {
    const schedule_sections = [
      ["Boat-F1", "timetable"],
      ["CR-Worcester", "timetable"],
      ["CR-Fairmount", "line"],
      ["Green", "line"],
      ["Green-E", "line"],
      ["Red", "line"],
      ["1", "line"]
    ];
    for (let [route, tab] of schedule_sections) {
      cy.visit(`/schedules/${route}/${tab}`);
      cy.wait(1000);
      if (tab == "line") {
        cy.get(".m-schedule-diagram");
        // test both directions
        cy.contains("Change Direction").click();
        cy.wait(1000);
        cy.url().then(url => {
          if (url.includes("schedule_direction%5Bdirection_id%5D=1")) {
            // default direction was 0 so verify it goes back
            cy.contains("Change Direction").click();
            cy.url().should("contain", "schedule_direction%5Bdirection_id%5D=0");
          } else if (url.includes("schedule_direction%5Bdirection_id%5D=0")) {
            // default direction was 1 so verify it goes back
            cy.contains("Change Direction").click();
            cy.url().should("contain", "schedule_direction%5Bdirection_id%5D=1");
          } else {
            throw new Error(`url has unexpected format: ${cy.url()}`)
          }
        })
      } else {
        cy.get(".m-timetable");
      }
    }
  });

  it("alerts page", () => {
    cy.visit("/alerts");
    cy.contains(".m-alerts__mode-buttons a", "Bus").click();
    cy.contains("Planned Service Alerts").click();
  });

  it("search page", () => {
    cy.visit("/search");
    cy.wait(1000);
    cy.get(
      'input[placeholder="Search for routes, places, information, and more"]'
    ).type("Charles");
    cy.url().should("contain", "query=Charles");
    cy.contains("#search-results-container .c-search-result__hit-name", "Charlestown Ferry");
    cy.contains("#search-results-container .c-search-result__hit-name", "Charles/MGH");
    cy.contains("#search-results-container .c-search-result__hit-name", "Charlestown Navy Yard");
    cy.contains("#search-results-container .c-search-result__hit-name", "Red Blue Connector");
    cy.get("#facet-label-stops").click(); // show stops and stations only
    cy.contains("#search-results-container .c-search-result__hit-name", "Red Line").should("not.exist");
    cy.contains("#search-results-container .c-search-result__hit-name", "Charlestown Ferry").should(
      "not.exist"
    );
    cy.contains("#search-results-container .c-search-result__hit-name", "Charles/MGH");
    cy.contains("#search-results-container .c-search-result__hit-name", "Charlestown Navy Yard");
    cy.contains("#search-results-container .c-search-result__hit-name", "Red Blue Connector").should(
      "not.exist"
    );
  });

  it("bus stop change page", () => {
    cy.visit("/bus-stop-changes");
    cy.contains("Past Changes").click();
  });

  it("a few more popular pages", () => {
    cy.visit("/customer-support");
    cy.visit("/accessibility");
    cy.visit("/destinations");
    cy.visit("/parking");
  });
});

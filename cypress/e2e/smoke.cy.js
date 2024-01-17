/**
 * This test goes to almost every page a typical user would visit. Tests will
 * fail if the page responds in a server error or a 404 error, or if any of the
 * endpoints called in the background during the test fail. This group of tests
 * is intended to be shallow, with more in-depth functionality tested elsewhere.
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
      cy.get(".c-banner__image");
      cy.get("#whats-happening-promoted > div").should("have.length", 2);
      if (!Cypress.config("baseUrl").includes("dev-green")) {
        // these are skipped on dev-green because the test CMS has no events
        cy.contains("Upcoming Public Meetings and Events");
        cy.get("li.m-event").should("have.length.greaterThan", 0);
      }
      cy.contains("Press Releases");
      cy.get("a.m-homepage__news-item").should("have.length.greaterThan", 0);
      cy.contains("What's Happening at the MBTA");
      cy.get(".m-whats-happening__item").should("have.length.greaterThan", 0);
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
    cy.get('input[placeholder="Enter a location"]').type("Boston Common");
    cy.get("#locations-list li").should("have.length.greaterThan", 0);
    cy.get("#locations-list li")
      .first()
      .click();
    cy.url().should("contain", "address=Boston+Common");
    cy.get(".c-sales-locations__card").should("have.length.greaterThan", 0);

    cy.visit("/fares/retail-sales-locations");
    cy.get('input[placeholder="Enter a location"]').type("Harvard Square");
    cy.get("#locations-list li").should("have.length.greaterThan", 0);
    cy.get("#locations-list li")
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
    cy.url().should("contain", "Boat-Hingham");
    cy.contains("main", "Station Information");
    cy.contains("View daily rates and facility information").click();
    cy.contains("Parking Rates");
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
      if (tab == "line") {
        cy.get(".m-schedule-diagram");
        // test both directions
        cy.contains("Change Direction").click();
        cy.url().should("contain", "schedule_direction%5Bdirection_id%5D=1");
      } else {
        cy.get(".m-timetable");
      }
    }
  });

  it("transit near me", () => {
    cy.intercept("/api/realtime/stops/*").as("getStops"); // slow request
    const latitude = 42.351693;
    const longitude = -71.066009;
    cy.visit("/transit-near-me", {
      onBeforeLoad({ navigator }) {
        cy.stub(navigator.geolocation, "getCurrentPosition").callsArgWith(0, {
          coords: { latitude, longitude }
        });
      }
    });
    // find the transit nearby
    cy.get('input[placeholder="Enter a location"]').focus();
    cy.get(".c-search-bar__my-location").click();
    // redirects to results
    cy.url().should(
      "contain",
      `location%5Blatitude%5D=${latitude}&location%5Blongitude%5D=${longitude}`
    );
    cy.wait("@getStops");
    cy.contains("Park St & Tremont St", { timeout: 15000 });
    cy.contains("Silver Line");
    cy.get("img.leaflet-marker-icon").should("have.length.greaterThan", 0);
  });

  it("trip planner", () => {
    cy.visit("/trip-planner");

    // reverses the inputs
    cy.get("#from").type("A");
    cy.get("#to").type("B");
    cy.get("#trip-plan-reverse-control").click();
    cy.get("#from").should("have.value", "B");
    cy.get("#to").should("have.value", "A");

    // opens the date picker
    cy.contains("#trip-plan-datepicker").should("not.exist");
    cy.get("#trip-plan-departure-title").click();
    cy.get("#trip-plan-datepicker");

    // updates title with selected departure option
    cy.get('label[for="arrive"]').click();
    cy.get("#trip-plan-departure-title").should("include.text", "Arrive by");
    cy.get('label[for="depart"]').click();
    cy.get("#trip-plan-departure-title").should("include.text", "Depart at");

    // shortcut /from/ - marker A prepopulated
    cy.visit("/trip-planner/from/North+Station");
    cy.get('img.leaflet-marker-icon[src="/images/icon-map-pin-a.svg"]');

    // shortcut /to/ - marker B prepopulated
    cy.visit("/trip-planner/to/South+Station");
    cy.get('img.leaflet-marker-icon[src="/images/icon-map-pin-b.svg"]');
  });

  // enable retries, since it times out sometimes
  it(
    "makes trip plans",
    {
      retries: 3
    },
    () => {
      cy.visit("/trip-planner");
      cy.get("#from").click();
      cy.contains(".c-search-bar__-suggestion", "South Station").click();
      cy.get("#to").click();
      cy.contains(".c-search-bar__-suggestion", "Boston Logan Airport").click();
      cy.contains("Get trip suggestions").click();
      cy.url({ timeout: 10000 }).should("contain", "plan%5Bfrom%5D");
      cy.contains("Trips shown are based on your selections");
      cy.get(".m-trip-plan-results__itinerary").should(
        "have.length.greaterThan",
        0
      );
    }
  );

  it("alerts page", () => {
    cy.visit("/alerts");
    cy.contains(".m-alerts__mode-buttons a", "Bus").click();
    cy.contains("Planned Service Alerts").click();
  });

  it("search page", () => {
    cy.visit("/search");
    cy.get(
      'input[placeholder="Search for routes, places, information, and more"]'
    ).type("Charles");
    cy.url().should("contain", "query=Charles");
    cy.contains("#search-results-container", "Red Line");
    cy.contains("#search-results-container", "Charlestown Ferry");
    cy.contains("#search-results-container", "Charles/MGH");
    cy.contains("#search-results-container", "Charlestown Navy Yard");
    cy.contains("#search-results-container", "Red Blue Connector");
    cy.get("#facet-label-stops").click(); // show stops and stations only
    cy.contains("#search-results-container", "Red Line").should("not.exist");
    cy.contains("#search-results-container", "Charlestown Ferry").should(
      "not.exist"
    );
    cy.contains("#search-results-container", "Charles/MGH");
    cy.contains("#search-results-container", "Charlestown Navy Yard");
    cy.contains("#search-results-container", "Red Blue Connector").should(
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

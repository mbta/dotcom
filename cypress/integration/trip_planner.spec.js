describe("Trip planner page", () => {
  beforeEach(() => {
    cy.visit("/trip-planner");
    cy.get("label[for='depart']").as('depart');
    cy.get("label[for='arrive']").as('arrive');
    cy.get("button[aria-controls='trip-plan-departure-section']").as('title');
    cy.get("#trip-plan-datepicker").as('datepicker');
    cy.get("#to").as('to');
    cy.get("#from").as('from');
    cy.get("#trip-plan-reverse-control").as('reverse_button');
  });

  it("datepicker starts hidden and shows when tab title is clicked", () => {
    cy.get('@datepicker').should("not.be.visible")
    cy.get('@title').click().wait(500) // let accordion finish expanding
      .then(() => {
        cy.get('@datepicker').should("be.visible")
      });
    cy.get('@depart').click().then(() => {
      cy.get('@datepicker').should("be.visible")
    });
    cy.get('@arrive').click().then(() => {
      cy.get('@datepicker').should("be.visible")
    });
  });

  it("reverse button swaps to and from", () => {
    cy.get('@from').type("A")
    cy.get('@to').type("B")
    cy.get('@from').should("have.value", "A")
    cy.get('@to').should("have.value", "B")
    cy.get('@reverse_button').click().then(() => {
      cy.get('@from').should("have.value", "B")
      cy.get('@to').should("have.value", "A")
    });
  });

  it("departure options update tab title", { retries: 3 }, () => {
    cy.get('@title').click()
      .wait(1500) // let accordion finish expanding
      .then(() => {
        cy.get('#trip-plan-departure-section').should("be.visible");
      });

    cy.get('@depart').click().then(() => {
      cy.get('@title').should("contain", "Depart at")
    });
    cy.get('@arrive').click().then(() => {
      cy.get('@title').should("contain", "Arrive by")
    });
  });
});

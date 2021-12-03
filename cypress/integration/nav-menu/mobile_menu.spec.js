// describe("XS Mobile Menu", () => {
//   beforeEach(() => {
//     cy.viewport('ipad-2')
//     cy.visit("/_flags");
//     cy.get(".feature-description")
//     cy.get("form[action*='nav_redesign'] > input.button-text").click()
//     cy.visit("/");
//   })

//   it("opens the mobile menu", () => {
//     cy.get(".m-menu__content").should("not.be.visible");
//     // cy.get("button.m-menu__toggle").click();
//     // cy.get(".m-menu__content").should("be.visible");
//   })
// })
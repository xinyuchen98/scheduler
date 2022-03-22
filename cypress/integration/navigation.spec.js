// Navigation Cypress tests
describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });
  
  it("should navigate to Tuesday", () => {
    cy.visit("/");
  
    // Find and click on Tuesday
    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected")  // Check if it has Tuesday selected
  });
});
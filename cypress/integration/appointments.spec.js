// Appointment Cypress tests
describe("Appointments", () => {
  // Reset database before each individual test
  beforeEach(() => {
    // GET request to reset
    cy.request("GET", "/api/debug/reset");

    // Visit the root page
    cy.visit("/");
 
    // Make sure the page loads up completely
    cy.contains("Monday");
  });
 
  it("should book an interview", () => {
    // Find and click on add button
    cy.get("[alt=Add]")
      .first()
      .click();
 
    // Find the input field and type the name
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
    // Select an interviewer
    cy.get('[alt="Sylvia Palmer"]').click();
 
    // Find and click on save button
    cy.contains("Save").click();
 
    // Check the appointment is added with correct name and interviewer
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an interview", () => {
    // Find and click on edit button
    cy.get("[alt=Edit]")
      .first()
      .click({ force: true });

    // Find the input field and type the name
    cy.get("[data-testid=student-name-input]").clear().type("Lydia Miller-Jones");
    // Select an interviewer
    cy.get('[alt="Tori Malcolm"]').click();

    // Find and click on save button
    cy.contains("Save").click();
 
    // Check the appointment is edited with correct name and interviewer
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("should cancel an interview", () => {
    // Find and click on delete button
    cy.get("[alt=Delete]")
    .first()
    .click({ force: true });

    // Find and click on confirm button
    cy.contains("Confirm").click();

    // Check the transition box is shown
    cy.contains("Deleting").should("exist");
    // Check the transition box is disappeared
    cy.contains("Deleting").should("not.exist");
 
    // Check the appointment is deleted
    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");
  });
});
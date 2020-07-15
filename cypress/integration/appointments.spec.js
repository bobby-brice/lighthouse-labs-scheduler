describe("Appointments", () => {
  beforeEach(() => {
    //refresh the database
    cy.request("GET", "/api/debug/reset")
    //visit the root of the project
    cy.visit("/");
    //ensure root page load occurs
    cy.contains("Monday");
  })

  it("should book an interview", () => {
    // Clicks on the "Add" button in the second appointment
    cy.get("[alt=Add]")
    .first()
    .click();
    
    // Enters their name
    cy.get('[data-testid=student-name-input]')
    .type("Lydia Miller-Jones")
    // Chooses an interviewer
    cy.get("[alt='Sylvia Palmer']").click();
    // Clicks the save button
    cy.contains('Save').click();
    // Sees the booked appointment
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an interview", () => {
    // Clicks on the "Edit" button in the first appointment
    cy.get('[alt=Edit]')
      .first()
      .click({force: true});  

    // Clears their name and enters a new one
    cy.get('[data-testid=student-name-input]')
      .clear()
      .type("Bobby Brice");

    // Chooses an new interviewer
    cy.get("[alt='Tori Malcolm']").click();
    // // Clicks the save button
    cy.contains('Save').click();

    // // Sees the booked appointment
    cy.contains(".appointment__card--show", "Bobby Brice");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("should cancel an interview", () => {
    cy.get('[alt=Delete]')
      .first()
      .click({
        force: true
      });
    
    cy.contains("Confirm").click();

    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");

    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");
  });
});
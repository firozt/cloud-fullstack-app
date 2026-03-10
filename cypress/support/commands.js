// fills out the form with fixtures data
Cypress.Commands.add('fillForm', () => {
  cy.fixture('formData').then((data) => {
    cy.get('#name').clear().type(data.name);
    cy.get('#email').clear().type(data.email);
    cy.get('#dob').type(data.dob);
    cy.get('#bio').clear().type(data.bio);
    cy.get('#fact').clear().type(data.fact);
    cy.get('#music').clear().type(data.music);
    cy.get('#profileImg').selectFile('cypress/fixtures/test-img.png');
  });
});

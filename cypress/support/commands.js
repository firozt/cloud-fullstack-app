// fills out the form with fixtures data, needs an input of which key from fixturs from data to use
Cypress.Commands.add('fillForm', (variant) => {
  cy.fixture('formData').then((data) => {
    const form = data[variant];
    expect(form).to.not.be.undefined;
    form.name && cy.get('#name').clear().type(form.name);
    form.email && cy.get('#email').clear().type(form.email);
    form.dob && cy.get('#dob').type(form.dob);
    form.bio && cy.get('#bio').clear().type(form.bio);
    form.fact && cy.get('#fact').clear().type(form.fact);
    form.music && cy.get('#music').clear().type(form.music);
    cy.get('#profileImg').selectFile('cypress/fixtures/test-img.png');
  });
});

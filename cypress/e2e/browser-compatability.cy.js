const TEST_URLS = [
  'http://mthree-peregrine-s3-3.s3-website-us-east-1.amazonaws.com/ramizmaryiah/', // homepage
  'http://mthree-peregrine-s3-3.s3-website-us-east-1.amazonaws.com/ramizmaryiah/submitted.html', // submit screen
];

TEST_URLS.array.forEach((URL) => {
  describe(`browser compatibility for ${URL}`, () => {
    beforeEach(() => {
      cy.visit(URL);
    });

    it('date input renders and accepts value', () => {
      cy.get('#dob')
        .should('be.visible')
        .type('1990-06-15')
        .should('have.value', '1990-06-15');
    });

    it('file input accepts png', () => {
      cy.get('#profileImg')
        .selectFile('cypress/fixtures/test-img.png')
        .then(($input) => {
          expect($input[0].files[0].name).to.eq('test-img.png');
        });
    });

    it('session storage is available', () => {
      cy.window().then((win) => {
        expect(win.sessionStorage).to.not.be.undefined;
      });
    });

    it('form layout is not broken', () => {
      cy.get('form').should('be.visible');
      cy.get('#name').should('be.visible');
      cy.get('#email').should('be.visible');
      cy.get('#dob').should('be.visible');
      cy.get('#bio').should('be.visible');
      cy.get('#fact').should('be.visible');
      cy.get('#music').should('be.visible');
      cy.get('#submit').should('be.visible');
    });

    it('submit button is clickable', () => {
      cy.get('#submit').should('be.visible').should('not.be.disabled');
    });
  });
});

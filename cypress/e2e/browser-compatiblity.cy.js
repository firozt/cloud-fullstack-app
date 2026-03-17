// checks that the css on the site is behaving as expected (flexbox sometimes iffy),
// all elements are visible, buttons work as intended
// checks that sessionStorage works (sometimes disabled on incognito)

const URL =
  'http://mthree-peregrine-s3-3.s3-website-us-east-1.amazonaws.com/ramizmaryiah/';

describe(`checks general compatability`, () => {
  describe('form page', () => {
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

    it('sessionStorage is available', () => {
      cy.window().then((win) => {
        expect(win.sessionStorage).to.exist;
        win.sessionStorage.setItem('test', 'value');
        expect(win.sessionStorage.getItem('test')).to.eq('value');
      });
    });
  });

  describe('card page', () => {
    // gets to card page
    beforeEach(() => {
      cy.visit(URL);
      cy.fillForm('valid');
      cy.get('#submit').click();
      cy.url().should('include', 'submitted.html');
      cy.get('#submit').click();
      cy.url().should('include', 'card.html');
    });

    describe('session storage survives page navigation', () => {
      const mockData = {
        name: 'Jane Smith',
        email: 'mail@mail.com',
        dob: '1990-06-15',
        bio: 'I am a software developer who loves hiking and photography.',
        fact: 'I once visited 5 countries in a single week.',
        music: 'Arctic Monkeys',
      };
      it('reads name from session storage', () => {
        cy.get('#name').should('have.text', mockData.name);
      });

      it('reads email from session storage', () => {
        cy.get('#email').should('have.text', mockData.email);
      });

      it('reads dob from session storage', () => {
        cy.get('#dob').should('have.text', mockData.dob);
      });

      it('reads bio from session storage', () => {
        cy.get('#bio').should('have.text', mockData.bio);
      });

      it('reads fact from session storage', () => {
        cy.get('#fact').should('have.text', mockData.fact);
      });

      it('reads music from session storage', () => {
        cy.get('#music').should('have.text', mockData.music);
      });

      it('reads profile image from session storage', () => {
        cy.get('#profile-img').should('have.attr', 'src').and('not.be.empty');
      });
    });
  });
});

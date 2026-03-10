const TEST_URL =
  'http://mthree-peregrine-s3-3.s3-website-us-east-1.amazonaws.com/ramizmaryiah/';
// tests for specifically my mthree website project, will fail for random websites
// sanity check
describe('url loads', () => {
  it('get request to homepage', () => {
    cy.visit(TEST_URL);
  });
});
// form page tests
describe('form page', () => {
  beforeEach(() => {
    cy.visit(TEST_URL);
  });

  it('has form loaded', () => {
    cy.visit(
      'http://mthree-peregrine-s3-3.s3-website-us-east-1.amazonaws.com/ramizmaryiah/index.html'
    );
    cy.get('form').find('input').should('exist');
  });

  it('all input fields are required', () => {
    cy.get('form input').each(($input) => {
      cy.wrap($input).should('have.attr', 'required');
    });
  });

  it('email validation logic', () => {
    // fill form
    cy.get('#name').clear().type('Jane Smith');
    cy.get('#email').clear().type('invalid email');
    cy.get('#dob').type('1990-06-15');
    cy.get('#bio')
      .clear()
      .type('I am a software developer who loves hiking and photography.');
    cy.get('#fact')
      .clear()
      .type('I once visited 5 countries in a single week.');
    cy.get('#music').clear().type('Arctic Monkeys');
    cy.get('#profileImg').selectFile('cypress/fixtures/test-image.png');
    cy.get('#submit').click();
    // check if invalid prompt appears for user
    cy.get('#email:invalid').should('exist');
  });

  it('valid redirect on form', () => {
    // fill form
    cy.get('#name').clear().type('Jane Smith');
    cy.get('#email').clear().type('mail@mail.com');
    cy.get('#dob').type('1990-06-15');
    cy.get('#bio')
      .clear()
      .type('I am a software developer who loves hiking and photography.');
    cy.get('#fact')
      .clear()
      .type('I once visited 5 countries in a single week.');
    cy.get('#music').clear().type('Arctic Monkeys');
    cy.get('#profileImg').selectFile('cypress/fixtures/test-image.png');
    // submit
    cy.get('#submit').click();
    // check we got redirected to correct html file
    cy.url().should('eq', TEST_URL + 'submitted.html');
  });
});

describe('submitted page', () => {
  // visits homepage fills out form and is now on the submitted page
  beforeEach(() => {
    cy.visit(TEST_URL);
    cy.get('#name').clear().type('Jane Smith');
    cy.get('#email').clear().type('mail@mail.com');
    cy.get('#dob').type('1990-06-15');
    cy.get('#bio')
      .clear()
      .type('I am a software developer who loves hiking and photography.');
    cy.get('#fact')
      .clear()
      .type('I once visited 5 countries in a single week.');
    cy.get('#music').clear().type('Arctic Monkeys');
    cy.get('#profileImg').selectFile('cypress/fixtures/test-image.png');
    cy.get('#submit').click();
  });

  it('form data session storage exists', () => {
    cy.window().then((win) => {
      expect(win.localStorage.getItem('formData')).to.exist;
    });
  });

  it('profileImg session stoagge exists', () => {
    cy.window().then((win) => {
      expect(win.localStorage.getItem('profileImg')).to.exist;
    });
  });

  it('generate card redirect', () => {
    // click on generate card button to procede
    cy.get('button').first().click();
    // check were on the correct page
    cy.url().should('eq', TEST_URL + 'card.html');
  });
});

describe('card page', () => {});

// tests for specifically my mthree website project, will fail for random websites
const TEST_URL =
  'http://mthree-peregrine-s3-3.s3-website-us-east-1.amazonaws.com/ramizmaryiah/';

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
    cy.fillForm();
    // override valid data from fixture with invalid email
    cy.get('#email').clear().type('invalid email');
    cy.get('#submit').click();
    // check if invalid prompt appears for user
    cy.get('#email:invalid').should('exist');
  });

  it('valid redirect on form', () => {
    // fill form
    cy.fillForm();
    // submit
    cy.get('#submit').click();
    // check we got redirected to correct html file

    cy.url().should('include', 'submitted.html');
  });
});

// submitted page tests
describe('submitted page', () => {
  // visits homepage fills out form and is now on the submitted page
  beforeEach(() => {
    cy.visit(TEST_URL);
    cy.fillForm();
    cy.get('#submit').click();
    cy.url().should('include', 'submitted.html');
  });

  it('form data session storage exists', () => {
    cy.window().then((win) => {
      expect(win.sessionStorage.getItem('formData')).to.exist;
    });
  });

  it('profileImg session storage exists', () => {
    cy.window().then((win) => {
      expect(win.sessionStorage.getItem('profileImg')).to.exist;
    });
  });

  it('generate card redirect', () => {
    // click on generate card button to procede
    cy.get('button').first().click();
    // check were on the correct page
    cy.url().should('include', TEST_URL + 'card.html');
  });

  it('testing that capitaliseWords works', () => {
    cy.get('td').first().should('have.text', 'Jane Smith');
  });
});

// card page tests
describe('card page', () => {
  beforeEach(() => {
    cy.visit(TEST_URL);
    cy.fillForm();
    cy.get('#submit').click();
    cy.url().should('include', 'submitted.html');
    cy.get('#submit').click();
    cy.url().should('include', 'card.html');
  });

  // color pickers
  it('background color changes card background', () => {
    cy.get('#bgColor').invoke('val', '#ff0000').trigger('input');
    cy.get('#card').should('have.css', 'background-color', 'rgb(255, 0, 0)');
  });

  it('text color changes card text color', () => {
    cy.get('#textColor').invoke('val', '#00ff00').trigger('input');
    cy.get('#card').should('have.css', 'color', 'rgb(0, 255, 0)');
  });

  it('bio text color changes bio color', () => {
    cy.get('#bioTextColor').invoke('val', '#0000ff').trigger('input');
    cy.get('#bio').should('have.css', 'color', 'rgb(0, 0, 255)');
  });

  // toggles - hide
  it('unchecking DOB hides dob row', () => {
    cy.get('#toggleDob').uncheck();
    cy.get('#dobRow').should('have.css', 'display', 'none');
  });

  it('unchecking email hides email row', () => {
    cy.get('#toggleEmail').uncheck();
    cy.get('#emailRow').should('have.css', 'display', 'none');
  });

  it('unchecking fact hides fact row', () => {
    cy.get('#toggleFact').uncheck();
    cy.get('#factRow').should('have.css', 'display', 'none');
  });

  it('unchecking music hides music row', () => {
    cy.get('#toggleMusic').uncheck();
    cy.get('#musicRow').should('have.css', 'display', 'none');
  });

  // toggles - show again
  it('rechecking DOB shows dob row', () => {
    cy.get('#toggleDob').uncheck().check();
    cy.get('#dobRow').should('have.css', 'display', 'flex');
  });

  it('rechecking email shows email row', () => {
    cy.get('#toggleEmail').uncheck().check();
    cy.get('#emailRow').should('have.css', 'display', 'flex');
  });

  it('rechecking fact shows fact row', () => {
    cy.get('#toggleFact').uncheck().check();
    cy.get('#factRow').should('have.css', 'display', 'flex');
  });

  it('rechecking music shows music row', () => {
    cy.get('#toggleMusic').uncheck().check();
    cy.get('#musicRow').should('have.css', 'display', 'flex');
  });
});

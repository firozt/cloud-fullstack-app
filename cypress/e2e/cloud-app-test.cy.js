// tests for specifically my mthree website project, will fail for random websites
const TEST_URL =
  'http://mthree-peregrine-s3-3.s3-website-us-east-1.amazonaws.com/ramizmaryiah/';

// form page tests
describe('form page input validation', () => {
  beforeEach(() => {
    cy.visit(TEST_URL);
  });

  it('has form loaded', () => {
    cy.get('form').find('input').should('exist');
  });

  it('all input fields are required', () => {
    cy.get('form input').each(($input) => {
      cy.wrap($input).should('have.attr', 'required');
    });
  });

  // fills in each input, leaving one, makes sure no redirection happens as all inputs must be entered
  const requiredFields = ['name', 'email', 'dob', 'bio', 'fact', 'music'];

  requiredFields.forEach((variant) => {
    it(`does not submit with no-${variant}`, () => {
      cy.url().then((curURL) => {
        cy.fillForm(`no-${variant}`);
        cy.get('#submit').click();
        cy.url().should('eq', curURL);
      });
    });
  });

  it('email validation logic', () => {
    cy.fillForm('valid');
    // override valid data from fixture with invalid email
    cy.get('#email').clear().type('invalid email');
    cy.get('#submit').click();
    // check if invalid prompt appears for user
    cy.get('#email:invalid').should('exist');
  });

  it('valid redirect on form', () => {
    // fill form
    cy.fillForm('valid');
    // submit
    cy.get('#submit').click();
    // check we got redirected to correct html file

    cy.url().should('include', 'submitted.html');
  });
});

describe('form page boundary conditions', () => {
  beforeEach(() => {
    cy.visit(TEST_URL);
  });

  // NAME - minlength="2" maxlength="100"
  describe('name field', () => {
    it('rejects name below min (1 char)', () => {
      cy.url().then((curURL) => {
        cy.fillForm('valid');
        cy.get('#name').clear().type('A');
        cy.get('#submit').click();
        cy.url().should('eq', curURL);
      });
    });

    it('accepts name at min (2 chars)', () => {
      cy.url().then((curURL) => {
        cy.fillForm('valid');
        cy.get('#name').clear().type('AB');
        cy.get('#submit').click();
        cy.url().should('not.eq', curURL);
      });
    });

    it('accepts name at max (100 chars)', () => {
      cy.url().then((curURL) => {
        cy.fillForm('valid');
        cy.get('#name').clear().type('A'.repeat(100));
        cy.get('#submit').click();
        cy.url().should('not.eq', curURL);
      });
    });

    // maxlength prevents typing over 100 so check input is capped
    it('caps name at max (100 chars)', () => {
      cy.fillForm('valid');
      cy.get('#name').clear().type('A'.repeat(110));
      cy.get('#name')
        .invoke('val')
        .then((val) => {
          expect(val.length).to.eq(100);
        });
    });
  });

  // EMAIL - minlength="6" maxlength="254"
  describe('email field', () => {
    it('rejects email below min (5 chars)', () => {
      cy.url().then((curURL) => {
        cy.fillForm('valid');
        cy.get('#email').clear().type('a@b.c');
        cy.get('#submit').click();
        cy.url().should('eq', curURL);
      });
    });

    it('accepts email at min (6 chars)', () => {
      cy.url().then((curURL) => {
        cy.fillForm('valid');
        cy.get('#email').clear().type('a@b.co');
        cy.get('#submit').click();
        cy.url().should('not.eq', curURL);
      });
    });

    it('accepts email at max (254 chars)', () => {
      cy.url().then((curURL) => {
        cy.fillForm('valid');
        const longEmail = 'a'.repeat(243) + '@example.com';
        cy.get('#email').clear().type(longEmail);
        cy.get('#submit').click();
        cy.url().should('not.eq', curURL);
      });
    });

    it('caps email at max (254 chars)', () => {
      cy.fillForm('valid');
      cy.get('#email')
        .clear()
        .type('a'.repeat(244) + '@example.com');
      cy.get('#email')
        .invoke('val')
        .then((val) => {
          expect(val.length).to.eq(254);
        });
    });
  });

  // DOB - no min/max in your HTML so test sensible boundaries
  describe('dob field', () => {
    it('rejects future date', () => {
      cy.url().then((curURL) => {
        cy.fillForm('valid');
        cy.get('#dob').clear().type('2099-01-01');
        cy.get('#submit').click();
        cy.url().should('eq', curURL);
      });
    });

    it('accepts valid date of birth', () => {
      cy.url().then((curURL) => {
        cy.fillForm('valid');
        cy.get('#dob').clear().type('1990-06-15');
        cy.get('#submit').click();
        cy.url().should('not.eq', curURL);
      });
    });
  });

  // BIO - minlength="10" maxlength="500"
  describe('bio field', () => {
    it('rejects bio below min (9 chars)', () => {
      cy.url().then((curURL) => {
        cy.fillForm('valid');
        cy.get('#bio').clear().type('A'.repeat(9));
        cy.get('#submit').click();
        cy.url().should('eq', curURL);
      });
    });

    it('accepts bio at min (10 chars)', () => {
      cy.url().then((curURL) => {
        cy.fillForm('valid');
        cy.get('#bio').clear().type('A'.repeat(10));
        cy.get('#submit').click();
        cy.url().should('not.eq', curURL);
      });
    });

    it('accepts bio at max (500 chars)', () => {
      cy.url().then((curURL) => {
        cy.fillForm('valid');
        cy.get('#bio').clear().type('A'.repeat(500));
        cy.get('#submit').click();
        cy.url().should('not.eq', curURL);
      });
    });

    it('caps bio at max (500 chars)', () => {
      cy.fillForm('valid');
      cy.get('#bio').clear().type('A'.repeat(510));
      cy.get('#bio')
        .invoke('val')
        .then((val) => {
          expect(val.length).to.eq(500);
        });
    });
  });

  // FACT - minlength="10" maxlength="500"
  describe('fact field', () => {
    it('rejects fact below min (9 chars)', () => {
      cy.url().then((curURL) => {
        cy.fillForm('valid');
        cy.get('#fact').clear().type('A'.repeat(9));
        cy.get('#submit').click();
        cy.url().should('eq', curURL);
      });
    });

    it('accepts fact at min (10 chars)', () => {
      cy.url().then((curURL) => {
        cy.fillForm('valid');
        cy.get('#fact').clear().type('A'.repeat(10));
        cy.get('#submit').click();
        cy.url().should('not.eq', curURL);
      });
    });

    it('accepts fact at max (500 chars)', () => {
      cy.url().then((curURL) => {
        cy.fillForm('valid');
        cy.get('#fact').clear().type('A'.repeat(500));
        cy.get('#submit').click();
        cy.url().should('not.eq', curURL);
      });
    });

    it('caps fact at max (500 chars)', () => {
      cy.fillForm('valid');
      cy.get('#fact').clear().type('A'.repeat(510));
      cy.get('#fact')
        .invoke('val')
        .then((val) => {
          expect(val.length).to.eq(500);
        });
    });
  });

  // MUSIC - minlength="2" maxlength="100"
  describe('music field', () => {
    it('rejects music below min (1 char)', () => {
      cy.url().then((curURL) => {
        cy.fillForm('valid');
        cy.get('#music').clear().type('A');
        cy.get('#submit').click();
        cy.url().should('eq', curURL);
      });
    });

    it('accepts music at min (2 chars)', () => {
      cy.url().then((curURL) => {
        cy.fillForm('valid');
        cy.get('#music').clear().type('AB');
        cy.get('#submit').click();
        cy.url().should('not.eq', curURL);
      });
    });

    it('accepts music at max (100 chars)', () => {
      cy.url().then((curURL) => {
        cy.fillForm('valid');
        cy.get('#music').clear().type('A'.repeat(100));
        cy.get('#submit').click();
        cy.url().should('not.eq', curURL);
      });
    });

    it('caps music at max (100 chars)', () => {
      cy.fillForm('valid');
      cy.get('#music').clear().type('A'.repeat(110));
      cy.get('#music')
        .invoke('val')
        .then((val) => {
          expect(val.length).to.eq(100);
        });
    });
  });
});

// submitted page tests
describe('submitted page', () => {
  // visits homepage fills out form and is now on the submitted page
  beforeEach(() => {
    cy.visit(TEST_URL);
    cy.fillForm('valid');
    cy.get('#submit').click();
    cy.url().should('include', 'submitted.html');
  });

  it('form data session storage exists', () => {
    cy.window().then((win) => {
      expect(win.sessionStorage.getItem('formData')).to.exist;
    });
  });

  it('form data session storage values correct', () => {
    cy.fixture('formData').then((fixtureData) => {
      cy.window().then((win) => {
        const sessionData = JSON.parse(win.sessionStorage.getItem('formData'));
        const expected = fixtureData['valid'];

        expect(sessionData.name).to.not.be.undefined;
        expect(sessionData.name.toLowerCase()).to.eq(
          expected.name.toLowerCase()
        );

        expect(sessionData.email).to.not.be.undefined;
        expect(sessionData.email).to.eq(expected.email);

        expect(sessionData.dob).to.not.be.undefined;
        expect(sessionData.dob).to.eq(expected.dob);

        expect(sessionData.bio).to.not.be.undefined;
        expect(sessionData.bio).to.eq(expected.bio);

        expect(sessionData.fact).to.not.be.undefined;
        expect(sessionData.fact).to.eq(expected.fact);

        expect(sessionData.music).to.not.be.undefined;
        expect(sessionData.music).to.eq(expected.music);
      });
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
    cy.fillForm('valid');
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
    cy.get('#dobRow').should('not.be.visible');
  });

  it('unchecking email hides email row', () => {
    cy.get('#toggleEmail').uncheck();
    cy.get('#emailRow').should('not.be.visible');
  });

  it('unchecking fact hides fact row', () => {
    cy.get('#toggleFact').uncheck();
    cy.get('#factRow').should('not.be.visible');
  });

  it('unchecking music hides music row', () => {
    cy.get('#toggleMusic').uncheck();
    cy.get('#musicRow').should('not.be.visible');
  });

  // toggles - show again
  it('rechecking DOB shows dob row', () => {
    cy.get('#toggleDob').uncheck().check();
    cy.get('#dobRow').should('be.visible');
  });

  it('rechecking email shows email row', () => {
    cy.get('#toggleEmail').uncheck().check();
    cy.get('#emailRow').should('be.visible');
  });

  it('rechecking fact shows fact row', () => {
    cy.get('#toggleFact').uncheck().check();
    cy.get('#factRow').should('be.visible');
  });

  it('rechecking music shows music row', () => {
    cy.get('#toggleMusic').uncheck().check();
    cy.get('#musicRow').should('be.visible');
  });
});

// general browser tests, should work for any website given

const ALL_URLS = [
  'http://mthree-peregrine-s3-3.s3-website-us-east-1.amazonaws.com/ramizmaryiah/', // homepage
  'http://mthree-peregrine-s3-3.s3-website-us-east-1.amazonaws.com/ramizmaryiah/submitted.html', // submit screen
  // 'http://mthree-peregrine-s3-3.s3-website-us-east-1.amazonaws.com/ramizmaryiah/card.html', // card page
];

// get all links, run all tests for all pages
ALL_URLS.forEach((CurrentURL) => {
  // sanity check
  describe('sanity check', () => {
    it('passes', () => {
      cy.visit(CurrentURL);
    });
  });

  // browser compatability checks
  describe(`browser compatability tests for url ${CurrentURL}`, () => {
    beforeEach(() => {
      cy.visit(CurrentURL);
    });

    // checks theres an index.html (or equiv)
    it('homepage check', () => {
      cy.get('body').should('exist');
    });

    // check if all images loads
    it('all images load successfully', () => {
      cy.get('body').then(($body) => {
        if ($body.find('img').length == 0) return; // no images
        cy.get('img').each(($img) => {
          cy.wrap($img)
            .should('have.prop', 'naturalWidth')
            .and('be.greaterThan', 0);
        });
      });
    });

    // check if all css files load on homepage
    it('stylesheets load successfully', () => {
      cy.get('link[rel="stylesheet"]').each(($link) => {
        const href = $link.attr('href');
        if (!href) return;
        const url = new URL(href, CurrentURL).href;
        cy.request(url).its('status').should('eq', 200);
      });
    });

    // check if js files load
    it('javscript loads successfully', () => {
      cy.get('body').then(($body) => {
        // get body
        const jsScripts = $body.find('script[src$=".js"]');
        if (jsScripts.length == 0) return; // no scripts
        cy.get('script[src$=".js"]').each(($script) => {
          const srcVal = $script.attr('src');
          const url = new URL(srcVal, CurrentURL).href;
          cy.request(url).its('status').should('eq', 200);
        });
      });
    });
  });
});

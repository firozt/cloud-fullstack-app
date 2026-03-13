// general browser tests, should work for any website given

const TEST_URLS = [
  'http://mthree-peregrine-s3-3.s3-website-us-east-1.amazonaws.com/ramizmaryiah/', // homepage
  'http://mthree-peregrine-s3-3.s3-website-us-east-1.amazonaws.com/ramizmaryiah/submitted.html', // submit screen
];

// get all links, run all tests for all pages
TEST_URLS.forEach((CurrentURL) => {
  // browser compatability checks
  describe(`browser compatability tests for url ${CurrentURL}`, () => {
    beforeEach(() => {
      cy.visit(CurrentURL);
    });

    // checks theres an index.html (or equiv)
    it('page body loads successfully', () => {
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

    // validate different screen sizes
    const viewports = [
      { name: 'mobile', width: 480, height: 812 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'desktop', width: 1920, height: 1080 },
    ];

    viewports.forEach(({ name, width, height }) => {
      it(`should have no horizontal overflow on ${name}`, () => {
        cy.viewport(width, height);
        cy.document().then((doc) => {
          const docWidth = doc.documentElement.scrollWidth;
          const viewportWidth = doc.documentElement.clientWidth;
          expect(docWidth).to.be.lte(viewportWidth);
        });
      });
    });
  });
});

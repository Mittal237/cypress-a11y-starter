// Example custom command
Cypress.Commands.add('dt', (sel) => cy.get(`[data-test="${sel}"]`));

// Robust, retry-friendly visit
Cypress.Commands.add('safeVisit', (path = '/', opts = {}) => {
  const options = { timeout: 120000, failOnStatusCode: false, ...opts };

  // preflight: make sure host is reachable
  cy.request({ url: Cypress.config('baseUrl') + path, failOnStatusCode: false });

  // visit and ensure DOM is usable (not just waiting for the 'load' event forever)
  cy.visit(path, options);
  cy.document({ timeout: 30000 }).its('readyState').should('not.eq', 'loading');
  cy.get('body', { timeout: 30000 }).should('be.visible');
});

// Login that uses safeVisit
Cypress.Commands.add('login', (username, password) => {
  cy.safeVisit('/');
  cy.get('#user-name', { timeout: 30000 }).should('be.visible').clear().type(username);
  cy.get('#password').clear().type(password);
  cy.get('#login-button').click();
  cy.url({ timeout: 30000 }).should('include', '/inventory.html');
});

// Utility to guarantee an empty cart at the start of a test
Cypress.Commands.add('ensureEmptyCart', () => {
  cy.get('.shopping_cart_link').click();
  cy.url().should('include', '/cart.html');

  cy.get('body').then($b => {
    const hasItems = $b.find('[data-test^="remove-"]').length > 0;
    if (hasItems) {
      cy.get('[data-test^="remove-"]').each(($btn) => cy.wrap($btn).click());
    }
  });

  cy.get('.cart_item').should('not.exist');
  cy.get('.shopping_cart_badge').should('not.exist');

  // go back to inventory for the rest of the test
  cy.get('#continue-shopping').click();
  cy.url().should('include', '/inventory.html');
});
describe('SauceDemo – Accessibility', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('[a11y] login page has no critical/serious violations', () => {
    cy.checkPageA11y(undefined, {
      includedImpacts: ['critical', 'serious']
    });
  });

  it('[a11y] inventory page has no critical/serious violations after login', () => {
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();
    cy.url().should('include', '/inventory.html');

    cy.checkPageA11y('.inventory_list', {
      includedImpacts: ['critical', 'serious']
    });
  });
});

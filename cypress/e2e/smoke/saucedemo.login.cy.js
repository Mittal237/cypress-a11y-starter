describe('SauceDemo – Smoke Login', () => {
  it('[smoke] logs in with standard_user', () => {
    cy.visit('/');
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();
    cy.contains('.title', 'Products').should('be.visible');
  });
});

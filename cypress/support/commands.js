// Example custom command
Cypress.Commands.add('dt', (sel) => cy.get(`[data-test="${sel}"]`));

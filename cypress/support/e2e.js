import './commands';
import 'cypress-axe';

// Silence flaky third-party analytics that can hang the load event
beforeEach(() => {
  cy.intercept('**/events.backtrace.io/**', { statusCode: 204, body: '' });
});

// Helper to run axe consistently
Cypress.Commands.add('checkPageA11y', (context = undefined, options = undefined) => {
  cy.injectAxe();
  cy.checkA11y(context, options, (violations) => {
    const table = violations.map(({ id, impact, description, nodes }) => ({
      id, impact, description, nodes: nodes.length
    }));
    // eslint-disable-next-line no-console
    console.table(table);
  });
});

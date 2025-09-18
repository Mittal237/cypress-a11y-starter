describe('SauceDemo – Cart & Checkout', () => {
  beforeEach(() => {
    cy.login('standard_user', 'secret_sauce');
  });

  it('[regression] add to cart and complete checkout', () => {
    cy.ensureEmptyCart();

    // add a product and verify cart badge
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('.shopping_cart_badge').should('have.text', '1');

    // go to cart
    cy.get('.shopping_cart_link').click();
    cy.url().should('include', '/cart.html');
    cy.contains('.cart_item', 'Sauce Labs Backpack').should('be.visible');

    // checkout
    cy.get('[data-test="checkout"]').click();
    cy.url().should('include', '/checkout-step-one.html');

    // fill shipping info
    cy.get('[data-test="firstName"]').type('QA');
    cy.get('[data-test="lastName"]').type('Engineer');
    cy.get('[data-test="postalCode"]').type('30303');
    cy.get('[data-test="continue"]').click();

    // overview page
    cy.url().should('include', '/checkout-step-two.html');
    cy.contains('.summary_total_label', 'Total:').should('be.visible');

    // finish
    cy.get('[data-test="finish"]').click();
    cy.url().should('include', '/checkout-complete.html');
    cy.contains('.complete-header', 'Thank you for your order!').should('be.visible');
  });

  it('[regression] remove item from cart', () => {
    cy.ensureEmptyCart();

    // add on inventory
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    cy.get('.shopping_cart_badge').should('have.text', '1');

    // go to cart and remove there
    cy.get('.shopping_cart_link').click();
    cy.url().should('include', '/cart.html');
    cy.contains('.cart_item', 'Sauce Labs Bike Light').should('be.visible');

    cy.get('[data-test="remove-sauce-labs-bike-light"]').click();

    // assert empty cart
    cy.get('.cart_item').should('not.exist');
    cy.get('.shopping_cart_badge').should('not.exist');
  });
});
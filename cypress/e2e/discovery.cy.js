describe('Discovery', () => {
  it.only('should login successfully with valid credentials', () => {
    cy.visit('http://localhost:5173');
    cy.clearLocalStorage();
    cy.get('input[name=username]').type('username');
    cy.get('input[name=password]').type('pass');
    cy.get('button[type=submit]').click();
    cy.url().should('include', '/discovery');
    cy.get('[data-test="carrosel-item-Go-0"]');
    cy.get('[data-test=carrosel-item-Vue-1]');
    cy.get('[data-test=btn-CSS]').click();
    cy.get('[data-test=carrosel-item-CSS-1]');
    cy.get('[data-test=btn-Node]').click();
    cy.get('[data-test=carrosel-item-Node-1]');
  });
});

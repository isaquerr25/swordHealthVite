describe('Logout', () => {
  it('should login successfully with valid credentials', () => {
    cy.visit('http://localhost:5173');
    cy.get('input[name=username]').type('username');
    cy.get('input[name=password]').type('pass');
    cy.get('button[type=submit]').click();
    cy.url().should('include', '/discovery');
    cy.get('[data-test=btn-logout]').click();
    cy.url().should('include', '/');
  });
});

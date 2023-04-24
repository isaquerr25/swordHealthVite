describe('Logout', () => {
  it.only('should alter login successfully with valid credentials', () => {
    cy.visit('http://localhost:5173');
    cy.get('input[name=username]').type('username');
    cy.get('input[name=password]').type('pass');
    cy.get('button[type=submit]').click();
    cy.get('[data-test=btn-username]').click();
    cy.url().should('include', '/profile');
    cy.get('[name="username"]').type('john_doe');
    cy.get('[name="email"]').type('john.doe@example.com');

    cy.get('button[type="submit"]').should('not.be.disabled');
    cy.get('button[type="submit"]').click();

    cy.contains('Alter success');
  });

  it.only('should alter login successfully with valid credentials', () => {
    cy.visit('http://localhost:5173');
    cy.get('input[name=username]').type('username');
    cy.get('input[name=password]').type('pass');
    cy.get('button[type=submit]').click();
    cy.get('[data-test=btn-username]').click();
    cy.url().should('include', '/profile');
    cy.get('[name="username"]').type('john_doe');
    cy.get('[name="email"]').type('john.doe@example.com');

    cy.get('button[type="submit"]').click();

    cy.contains('Alter success');

    cy.get('[data-test=btn-logout]').click();
    cy.url().should('include', '/');

    cy.get('input[name=username]').type('john_doe');
    cy.get('input[name=password]').type('pass');
    cy.get('button[type=submit]').click();
    cy.url().should('include', '/discovery');
  });
});

describe('Home page integration', () => {
  it('Visits the home page', () => {
    cy.visit('http://localhost:6969');
  });

  it('Change default name', () => {
    cy.get('#app [type="text"]').as('inputHome');
    cy.get('[role="presentation"] [type="text"]').as('inputToolbar');

    cy.get('@inputHome').clear().type('New name');
    cy.get('header button').click();
    cy.get('@inputToolbar').clear().type('New name from toolbar');
    cy.get('.MuiGrid-grid-sm-8 > h1').should('have.text', 'New name from toolbar');
  });
})
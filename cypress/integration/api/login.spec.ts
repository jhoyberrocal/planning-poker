describe('Home page integration', () => {
  it('Success OK login api', () => {
    cy.request({
      url: 'http://localhost:3000/api/v1/auth/login',
      method: 'POST',
      body: {
        email: 'berrocaljhoy@gmail.com',
        password: 'noPassword',
      },
      failOnStatusCode: false,
    })
      .should(response => {
        expect(response.status).to.eq(401);
      });
  });
});

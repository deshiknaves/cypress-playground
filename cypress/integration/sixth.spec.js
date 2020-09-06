describe('Third', () => {
  it('should be able to set the third message', () => {
    cy.visit('/')
    cy.findByRole('button', { name: /third/i }).click()
    cy.findByRole('heading', { name: /third/i }).should('be.visible')
  })
})

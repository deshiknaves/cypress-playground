describe('First', () => {
  it('should be able to set the first message', () => {
    cy.visit('/')
    cy.findByRole('button', { name: /first/i }).click()
    cy.findByRole('heading', { name: /first/i }).should('be.visible')
  })
})

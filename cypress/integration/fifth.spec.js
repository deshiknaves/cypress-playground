describe('second', () => {
  it('should be able to set the second message', () => {
    cy.visit('/')
    cy.findByRole('button', { name: /second/i }).click()
    cy.findByRole('heading', { name: /second/i }).should('be.visible')
  })
})

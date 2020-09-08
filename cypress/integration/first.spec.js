describe('First', () => {
  it('should be able to set the first message', () => {
    cy.visit('/')
    cy.window().then(win => {
      console.log(win.msw)
    })
    cy.findByRole('button', { name: /first/i }).click()
    cy.findByRole('heading', { name: /first/i }).should('be.visible')
  })

  it('should be able to set the first message 2', () => {
    cy.visit('/')
    cy.window().then(win => {
      console.log(win.msw)
    })
    cy.mock('GET', 'route', 'options')
    cy.findByRole('button', { name: /first/i }).click()
    cy.findByRole('heading', { name: /first/i }).should('be.visible')
  })
})

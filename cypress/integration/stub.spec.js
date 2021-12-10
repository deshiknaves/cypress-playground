describe('Stub', () => {
  it('should be able mock uui', () => {
    cy.visit('/', {
      onBeforeLoad(win) {
        Object.defineProperty(win, '__v4', {
          get() {
            return cy.stub().returns('v4').as('v4')
          },
          set() {
            // Do nothing
          },
        })
      },
    })

    cy.window().then(win => {
      console.log(win.__v4())
    })
    cy.findByText('v4').should('exist')
  })
})

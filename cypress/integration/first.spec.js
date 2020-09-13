describe('First', () => {
  it('should be able to wait for a request to happen before it checks for the text', () => {
    cy.visit('/')
    cy.mock(
      'GET',
      'https://jsonplaceholder.typicode.com/todos/1',
      (req, res, ctx) => {
        return res(
          ctx.delay(2000),
          ctx.json({
            userId: 1,
            id: 1,
            title: 'Lord of the rings',
            completed: false,
          }),
        )
      },
    ).as('foo')

    cy.findByRole('button', { name: /first/i }).click()
    cy.waitForRequest('@foo')
    cy.getRequestCalls('@foo').then(calls => {
      expect(calls).to.have.length(1)
    })
    cy.findByRole('heading', { name: /first/i }).should('be.visible')
    cy.findByText(/lord of the rings/i).should('be.visible')
  })

  it('should be able to set the first message 2', () => {
    cy.visit('/')
    cy.mock(
      'GET',
      'https://jsonplaceholder.typicode.com/todos/1',
      (req, res, ctx) => {
        return res(
          ctx.json({
            userId: 1,
            id: 1,
            title: 'The outsider',
            completed: false,
          }),
        )
      },
    )
    cy.findByRole('button', { name: /first/i }).click()
    cy.findByRole('heading', { name: /first/i }).should('be.visible')
    cy.findByText(/the outsider/i).should('be.visible')
  })
})

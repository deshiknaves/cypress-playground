describe('MSW Requests', () => {
  it("should be able to wait for a request to happen that isn't mocked before it checks for the text", () => {
    cy.visit('/')
    cy.mock('GET', 'https://jsonplaceholder.typicode.com/todos/1').as('foo')

    cy.findByRole('button', { name: /first/i }).click()
    cy.waitForRequest('@foo').then(({ response }) => {
      cy.getRequestCalls('@foo').then(calls => {
        expect(calls).to.have.length(1)
      })
      cy.findByRole('heading', { name: /first/i }).should('be.visible')
      cy.findByText(new RegExp(response.body.title, 'i')).should('be.visible')
    })
  })

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
    cy.waitForRequest('@foo').then(({ response }) => {
      cy.getRequestCalls('@foo').then(calls => {
        expect(calls).to.have.length(1)
      })
      cy.findByRole('heading', { name: /first/i }).should('be.visible')
      cy.findByText(new RegExp(response.body.title, 'i')).should('be.visible')
    })
  })

  it('should be able to mock a different response', () => {
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

  it('should be able to return an error state', () => {
    cy.visit('/')
    cy.findByRole('button', { name: /error/i }).click()
    cy.mock('GET', 'https://jsonplaceholder.typicode.com/fake').as('fake')
    cy.waitForRequest('@fake').then(({ response }) => {
      cy.getRequestCalls('@fake').then(calls => {
        expect(calls).to.have.length(1)
      })
      cy.findByText(new RegExp(`error: ${response.status}`, 'i')).should(
        'be.visible',
      )
    })
  })

  it.only('should be able to update the mock', () => {
    cy.visit('/')
    cy.mock(
      'GET',
      'https://jsonplaceholder.typicode.com/todos/1',
      (req, res, ctx) => {
        return res(
          ctx.json({
            userId: 1,
            id: 1,
            title: 'Lord of the rings',
            completed: false,
          }),
        )
      },
    ).as('todos')

    cy.findByRole('button', { name: /first/i }).click()
    cy.waitForRequest('@todos')
    cy.getRequestCalls('@todos').then(calls => {
      expect(calls).to.have.length(1)
    })
    cy.findByText(/lord of the rings/i).should('be.visible')

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
    ).as('todos')
    cy.findByRole('button', { name: /refetch/i }).click()
    cy.waitForRequest('@todos')
    cy.getRequestCalls('@todos').then(calls => {
      expect(calls).to.have.length(2)
    })
    cy.findByText(/the outsider/i).should('be.visible')
  })
})

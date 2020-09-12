describe('Request Body', () => {
  it('should be able to get a request body and create a response', () => {
    cy.server()
    cy.routeFromRequestBody(
      'POST',
      'https://jsonplaceholder.typicode.com/todos',
      ({ request }) => {
        console.log(request.body)
        return { ...request.body, foo: 'bar' }
      },
    ).as('something')
    cy.visit('/')
    cy.findByRole('button', { name: /create todo/i }).click()
    cy.findByText(
      '{ "title": "foo", "userId": 1, "complete": false, "foo": "bar" }',
    )
  })
})

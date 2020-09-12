// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

function replaceResponse(makeResponse) {
  return rawRequest => {
    const { xhr } = rawRequest
    Object.defineProperty(xhr.__proto__, 'response', { writable: true })
    Object.defineProperty(xhr.__proto__, 'responseText', { writable: true })
    xhr.response = JSON.stringify(makeResponse(rawRequest))
    xhr.responseText = JSON.stringify(makeResponse(rawRequest))
    return rawRequest
  }
}

Cypress.Commands.add('nodeLog', message => cy.task('nodeLog', message))

Cypress.Commands.add('routeFromRequestBody', (method, url, onResponse) => {
  return cy.route({
    method,
    url,
    response: '', // This will get replaced
    onResponse: replaceResponse(onResponse),
  })
})

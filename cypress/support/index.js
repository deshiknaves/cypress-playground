import { setupWorker, rest } from 'msw'
import '@testing-library/cypress/add-commands'

// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

let worker
let requests = {}

function requestKey(request) {
  return `${request.method}:${request.url}`
}

function registerRequest(request) {
  const key = requestKey(request)
  if (!requests[key]) {
    requests[key] = { complete: false, calls: [] }
  }
  requests[key].calls.push({ id: request.id, request, complete: false })
}

function completeRequest(request, response) {
  const key = requestKey(request)
  requests[key].complete = true
  const call = requests[key].calls.find(i => i.id === request.id)
  call.response = response
  call.complete = true
}

before(() => {
  navigator.serviceWorker.addEventListener('message', message => {
    const event = JSON.parse(message.data)
    switch (event.type) {
      case 'REQUEST':
        if (event.payload.url.match(/.+\.js$/)) return
        registerRequest(event.payload)
        break
      case 'REQUEST_COMPLETE':
        completeRequest(event.request, event.response)
        break
    }
  })
  worker = setupWorker()
  cy.wrap(worker.start({ serviceWorker: { shared: true } }), { log: false })
})

Cypress.on('window:before:load', win => {
  if (!worker) return

  worker.resetHandlers()
  requests = {}

  win.msw = { worker, rest }
})

Cypress.Commands.add('waitForRequest', alias => {
  cy.get(alias).then(url => {
    Cypress.log({
      displayName: 'Waiting for request',
      message: `${alias} — ${url.replace(':', ' ')}`,
    })
    cy.waitUntil(() => requests[url], { log: false })
  })
})

Cypress.Commands.add('mock', function mock(method, route, fn, options = {}) {
  worker.use(
    rest[method.toLowerCase()](route, (req, res, ctx) => {
      function customResponse(...args) {
        const response = res(...args)
        Cypress.log({
          displayName: '[MSW]',
          message: `Testing`,
          consoleProps: () => ({
            request: req,
            response,
          }),
        })
        return response
      }

      return fn(req, customResponse, ctx)
    }),
  )

  return `${method}:${route}`
})

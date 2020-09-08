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

Cypress.on('window:before:load', win => {
  if (!worker) {
    worker = setupWorker(
      rest.get(
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
      ),
    )
    worker.start()
  }

  win.msw = { worker, rest }
})

Cypress.Commands.add('mock', () => {
  console.log(worker)
})

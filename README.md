# Cypress Playground

This is a repository to show examples of different things that I've needed for
Cypress and how I've solved them.

## Parallel tests without Cypress Dashboard

This repository uses `main.yaml` to run the tests in parallel using only GitHub
Actions.

## MSW bootstrapped on the Cypress side and not in the Application

The goal was to use MSW instead of `route`. This can be useful because at this
moment, you can't inspect the body of a request to then respond back with in
Cypress. This is sometimes necessary. So this POC will load MSW as part of the
`before` in Cypress and then add a simple command `cy.mock` to use to mock
requests while writing the test. The Application has no bootstrapping with MSW.

Check out `cypress/support/index.js` and `cypress/integration/first.spec.js`

This did require a modified `mockServiceWorker.js` file as the `clientId` from
the App (React App) and that of the Cypress app don't match. There is an open
discussion: https://github.com/mswjs/msw/issues/374

import './commands'

before(() => {
    // disable Cypress's default behavior of logging all XMLHttpRequests and fetches
    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
  })
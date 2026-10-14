const BASE = 'https://demoqa.com'

function visitar(caminho) {
  cy.viewport(1366, 900)
  cy.on('uncaught:exception', () => false)
  cy.visit(`${BASE}${caminho}`, { timeout: 30000 })
}

function removerSobreposicao() {
  cy.get('body').then(($body) => {
    ;['#fixedban', 'footer', 'iframe'].forEach((seletor) => {
      if ($body.find(seletor).length) {
        Cypress.$(seletor).remove()
      }
    })
  })
}

module.exports = {
  BASE,
  visitar,
  removerSobreposicao,
}

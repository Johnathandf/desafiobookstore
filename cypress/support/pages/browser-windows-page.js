const { BASE, visitar } = require('./demoqa')

const CAMINHO_AMOSTRA = '/sample'

function abrir() {
  visitar('/browser-windows')
}

function clicarNovaJanela() {
  cy.window().then((janela) => {
    cy.stub(janela, 'open').as('aberturaDeJanela')
  })
  cy.get('#windowButton').click()
}

function visitarPaginaDeAmostra() {
  cy.visit(`${BASE}${CAMINHO_AMOSTRA}`, { timeout: 30000 })
}

function textoDaAmostra() {
  return cy.contains('This is a sample page')
}

module.exports = {
  CAMINHO_AMOSTRA,
  abrir,
  clicarNovaJanela,
  visitarPaginaDeAmostra,
  textoDaAmostra,
}

const { visitar, removerSobreposicao } = require('./demoqa')

function abrir() {
  visitar('/')
  removerSobreposicao()
  cy.contains('.category-cards .card', 'Widgets').click()
  removerSobreposicao()
  cy.contains('.menu-list .text', 'Progress Bar').click()
  cy.get('#startStopButton').should('have.text', 'Start')
}

function barra() {
  return cy.get('#progressBar [role="progressbar"]')
}

function iniciar() {
  removerSobreposicao()
  cy.get('#startStopButton').should('have.text', 'Start').click()
}

function parar() {
  cy.wait(1000)
  removerSobreposicao()
  cy.get('#startStopButton').should('have.text', 'Stop').click()
}

function percentual() {
  return barra().invoke('attr', 'aria-valuenow').then(Number)
}

function aguardarCemPorCento() {
  cy.get('#progressBar [role="progressbar"]', { timeout: 20000 }).should('have.attr', 'aria-valuenow', '100')
  cy.wait(200)
}

function resetar() {
  cy.get('#resetButton').should('be.visible').click()
}

function guardarPrint(nome) {
  removerSobreposicao()
  cy.get('#progressBarContainer').should('be.visible')
  cy.screenshot(nome, { overwrite: true })
}

module.exports = {
  abrir,
  iniciar,
  parar,
  percentual,
  aguardarCemPorCento,
  resetar,
  guardarPrint,
}

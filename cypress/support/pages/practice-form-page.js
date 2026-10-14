const { visitar, removerSobreposicao } = require('./demoqa')

const ARQUIVO = 'cypress/fixtures/arquivos/exemplo.txt'

const GENEROS = {
  Male: 'gender-radio-1',
  Female: 'gender-radio-2',
  Other: 'gender-radio-3',
}

const HOBBIES = {
  Sports: 'hobbies-checkbox-1',
  Reading: 'hobbies-checkbox-2',
  Music: 'hobbies-checkbox-3',
}

function abrir() {
  visitar('/automation-practice-form')
}

function preencher(estudante) {
  cy.get('#firstName').type(estudante.nome)
  cy.get('#lastName').type(estudante.sobrenome)
  cy.get('#userEmail').type(estudante.email)
  cy.get(`label[for="${GENEROS[estudante.genero]}"]`).click()
  cy.get('#userNumber').type(estudante.celular)

  cy.get('#dateOfBirthInput').click()
  cy.get('.react-datepicker__month-select').select('January')
  cy.get('.react-datepicker__year-select').select('1990')
  cy.get('.react-datepicker__day--015').not('.react-datepicker__day--outside-month').click()

  cy.get('#subjectsInput').type(estudante.materia)
  cy.get('.subjects-auto-complete__option').contains(estudante.materia).click()

  cy.get(`label[for="${HOBBIES[estudante.hobby]}"]`).click()
  cy.get('#uploadPicture').selectFile(ARQUIVO, { force: true })
  cy.get('#currentAddress').type(estudante.endereco)

  cy.get('#state').click()
  cy.get('#state input').type(`${estudante.estado}{enter}`, { force: true })
  cy.get('#city').click()
  cy.get('#city input').type(`${estudante.cidade}{enter}`, { force: true })
}

function enviar() {
  removerSobreposicao()
  cy.get('#submit').click()
}

function modal() {
  return cy.get('.modal-content', { timeout: 10000 })
}

function tituloDoModal() {
  return cy.get('#example-modal-sizes-title-lg')
}

function valorDoModal(campo) {
  return cy.contains('.modal-content td', campo).next('td')
}

function fecharModal() {
  removerSobreposicao()
  // O botão Close chama findDOMNode, ausente no React desta página.
  // Escape aciona o onHide do modal e conclui o fechamento.
  cy.get('#closeLargeModal').click({ force: true })
  cy.get('body').type('{esc}')
}

module.exports = {
  abrir,
  preencher,
  enviar,
  modal,
  tituloDoModal,
  valorDoModal,
  fecharModal,
}

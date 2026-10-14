const formulario = require('../../support/pages/practice-form-page')

const sufixo = Date.now().toString().slice(-6)

const estudante = {
  nome: `Ana${sufixo}`,
  sobrenome: 'Silva',
  email: `ana${sufixo}@teste.com`,
  genero: 'Male',
  celular: '1198765432',
  nascimento: '15 January,1990',
  materia: 'Maths',
  hobby: 'Sports',
  endereco: `Rua Cypress ${sufixo}`,
  estado: 'NCR',
  cidade: 'Delhi',
  arquivo: 'exemplo.txt',
}

describe('Practice Form', () => {
  it('deve cadastrar um estudante e confirmar os dados no modal', () => {
    formulario.abrir()
    formulario.preencher(estudante)
    formulario.enviar()

    formulario.modal().should('be.visible')
    formulario.tituloDoModal().should('have.text', 'Thanks for submitting the form')

    formulario.valorDoModal('Student Name').should('have.text', `${estudante.nome} ${estudante.sobrenome}`)
    formulario.valorDoModal('Student Email').should('have.text', estudante.email)
    formulario.valorDoModal('Gender').should('have.text', estudante.genero)
    formulario.valorDoModal('Mobile').should('have.text', estudante.celular)
    formulario.valorDoModal('Date of Birth').should('have.text', estudante.nascimento)
    formulario.valorDoModal('Subjects').should('have.text', estudante.materia)
    formulario.valorDoModal('Hobbies').should('have.text', estudante.hobby)
    formulario.valorDoModal('Picture').should('have.text', estudante.arquivo)
    formulario.valorDoModal('Address').should('have.text', estudante.endereco)
    formulario.valorDoModal('State and City').should('have.text', `${estudante.estado} ${estudante.cidade}`)

    formulario.fecharModal()
    formulario.modal().should('not.exist')
  })
})

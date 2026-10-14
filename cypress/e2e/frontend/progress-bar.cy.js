const progresso = require('../../support/pages/progress-bar-page')

describe('Progress Bar', () => {
  it('deve parar em até 25%, concluir em 100% e resetar', () => {
    progresso.abrir()
    progresso.iniciar()
    progresso.parar()

    progresso.percentual().should('be.at.most', 25)
    progresso.guardarPrint('parado-ate-25')

    progresso.iniciar()
    progresso.aguardarCemPorCento()
    progresso.percentual().should('eq', 100)
    progresso.guardarPrint('concluido-em-100')

    progresso.resetar()
    progresso.percentual().should('eq', 0)
    cy.get('#progressBar [role="progressbar"]').should('have.text', '0%')
    progresso.guardarPrint('resetado-em-0')
  })
})
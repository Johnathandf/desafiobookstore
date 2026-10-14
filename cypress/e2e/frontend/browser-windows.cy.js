const janelas = require('../../support/pages/browser-windows-page')

describe('Browser Windows', () => {
  it('deve solicitar a página de amostra e validar o texto nessa página', () => {
    janelas.abrir()
    janelas.clicarNovaJanela()

    cy.get('@aberturaDeJanela')
      .should('have.been.calledOnce')
      .and('have.been.calledWith', janelas.CAMINHO_AMOSTRA)

    janelas.visitarPaginaDeAmostra()
    janelas.textoDaAmostra().should('be.visible')
  })
})

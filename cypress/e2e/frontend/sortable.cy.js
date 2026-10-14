const lista = require('../../support/pages/sortable-page')

describe('Sortable', () => {
  it('deve reordenar a lista até One, Two, Three, Four, Five, Six', () => {
    lista.abrir()

    lista.itens().should('have.length', 6)
    lista.textos().should('deep.equal', lista.ORDEM_CRESCENTE)

    lista.arrastar('Six', 'One')
    lista.textos().should('not.deep.equal', lista.ORDEM_CRESCENTE)

    lista.ordenarCrescente()
    lista.textos().should('deep.equal', lista.ORDEM_CRESCENTE)
  })
})

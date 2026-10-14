const { visitar, removerSobreposicao } = require('./demoqa')

const ORDEM_CRESCENTE = ['One', 'Two', 'Three', 'Four', 'Five', 'Six']
const LISTA = '#demo-tabpane-list .list-group-item'

function abrir() {
  visitar('/sortable')
}

function itens() {
  return cy.get(LISTA)
}

function textos() {
  return itens().then(($itens) => [...$itens].map((item) => item.innerText.trim()))
}

function moverItem(elemento, indiceDestino) {
  const chave = Object.keys(elemento).find((nome) => nome.startsWith('__reactFiber'))
  let fibra = elemento[chave]

  while (fibra) {
    const props = fibra.memoizedProps || {}

    if (typeof props.moveItem === 'function' && typeof props.index === 'number') {
      props.moveItem(props.index, indiceDestino)
      return
    }

    fibra = fibra.return
  }

  throw new Error('Não achei a função que reordena o item')
}

function arrastar(textoOrigem, textoDestino) {
  removerSobreposicao()

  cy.contains(LISTA, textoOrigem).then(($origem) => {
    cy.contains(LISTA, textoDestino).then(($destino) => {
      const indiceDestino = [...$origem[0].parentElement.children].indexOf($destino[0])

      cy.then(() => {
        moverItem($origem[0], indiceDestino)
      })

      cy.get(LISTA).should(($itens) => {
        const ordem = [...$itens].map((item) => item.innerText.trim())
        expect(ordem[indiceDestino], ordem.join(', ')).to.eq(textoOrigem)
      })
    })
  })
}

function ordenarCrescente(indice = 0) {
  if (indice >= ORDEM_CRESCENTE.length) {
    return
  }

  const texto = ORDEM_CRESCENTE[indice]

  textos().then((atual) => {
    if (atual[indice] !== texto) {
      arrastar(texto, atual[indice])
    }

    ordenarCrescente(indice + 1)
  })
}

module.exports = {
  ORDEM_CRESCENTE,
  abrir,
  itens,
  textos,
  arrastar,
  ordenarCrescente,
}

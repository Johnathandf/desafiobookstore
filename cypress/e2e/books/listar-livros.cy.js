const CAMPOS_OBRIGATORIOS_DO_LIVRO = [
  'isbn',
  'title',
  'subTitle',
  'author',
  'publish_date',
  'publisher',
  'pages',
  'description',
  'website',
]

describe('GET /BookStore/v1/Books', () => {
  it('deve retornar a lista de livros com status 200 e estrutura válida', () => {
    cy.request({
      method: 'GET',
      url: '/BookStore/v1/Books',
    }).then((response) => {
      expect(response.status, 'status HTTP').to.eq(200)
      expect(response.body, 'corpo da resposta').to.have.property('books')
      expect(response.body.books, 'propriedade books').to.be.an('array')
      expect(
        response.body.books.length,
        'quantidade de livros retornados'
      ).to.be.greaterThan(0)

      response.body.books.forEach((livro, indice) => {
        expect(livro, `livro[${indice}]`).to.be.an('object')

        CAMPOS_OBRIGATORIOS_DO_LIVRO.forEach((campo) => {
          expect(livro, `livro[${indice}]`).to.have.property(campo)
          expect(
            livro[campo],
            `livro[${indice}].${campo}`
          ).to.not.equal(undefined)
        })

        expect(livro.isbn, `livro[${indice}].isbn`).to.be.a('string').and.not.be.empty
        expect(livro.title, `livro[${indice}].title`).to.be.a('string').and.not.be.empty
        expect(livro.author, `livro[${indice}].author`).to.be.a('string').and.not.be.empty
        expect(livro.pages, `livro[${indice}].pages`).to.be.a('number')
      })
    })
  })
})

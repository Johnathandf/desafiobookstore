const { criarUsuario, gerarToken } = require('../../support/api/account-api')

describe('POST /Account/v1/GenerateToken', () => {
  let credenciais

  before(() => {
    criarUsuario().then((resultado) => {
      expect(resultado.status, 'status da preparação do usuário').to.eq(201)
      credenciais = resultado.credenciais
    })
  })

  it('deve gerar um token com status 200 e status Success', () => {
    gerarToken(credenciais).then((resultado) => {
      expect(resultado.status, 'status HTTP').to.eq(200)
      expect(resultado.body, 'corpo da resposta').to.be.an('object')
      expect(resultado.body, 'corpo da resposta').to.have.property('status')
      expect(resultado.statusToken, 'status do token').to.eq('Success')
      expect(resultado.body, 'corpo da resposta').to.have.property('token')
      expect(resultado.token, 'token').to.be.a('string').and.not.be.empty
    })
  })
})

const { criarUsuario, gerarToken, validarAutorizacao } = require('../../support/api/account-api')

describe('POST /Account/v1/Authorized', () => {
  let credenciais

  before(() => {
    criarUsuario()
      .then((usuario) => {
        expect(usuario.status, 'status da preparação do usuário').to.eq(201)
        credenciais = usuario.credenciais

        // Nesta API, /Authorized responde false até o token ser gerado.
        return gerarToken(credenciais)
      })
      .then((token) => {
        expect(token.status, 'status da preparação do token').to.eq(200)
        expect(token.statusToken, 'status do token').to.eq('Success')
      })
  })

  it('deve autorizar o usuário criado com status 200 e resposta true', () => {
    validarAutorizacao(credenciais).then((resultado) => {
      expect(resultado.status, 'status HTTP').to.eq(200)
      expect(resultado.body, 'usuário autorizado').to.eq(true)
      expect(resultado.body, 'tipo da autorização').to.be.a('boolean')
    })
  })
})

const { criarUsuario } = require('../../support/api/account-api')

describe('POST /Account/v1/User', () => {
  it('deve criar um usuário com status 201, userID e username', () => {
    criarUsuario().then((resultado) => {
      expect(resultado.status, 'status HTTP').to.eq(201)
      expect(resultado.body, 'corpo da resposta').to.be.an('object')
      expect(resultado.body, 'corpo da resposta').to.have.property('userID')
      expect(resultado.userID, 'userID').to.be.a('string').and.not.be.empty
      expect(resultado.body, 'corpo da resposta').to.have.property('username')
      expect(resultado.username, 'username').to.be.a('string').and.not.be.empty
      expect(resultado.username, 'username').to.eq(resultado.credenciais.userName)
    })
  })
})

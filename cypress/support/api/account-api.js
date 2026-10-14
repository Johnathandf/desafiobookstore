const VARIAVEIS_OBRIGATORIAS = ['BOOKSTORE_PASSWORD', 'BOOKSTORE_USERNAME_PREFIX']

function obterConfiguracao() {
  const ausentes = VARIAVEIS_OBRIGATORIAS.filter((nome) => {
    const valor = Cypress.env(nome)
    return valor === undefined || valor === null || String(valor).trim() === ''
  })

  if (ausentes.length > 0) {
    throw new Error(
      `Defina as variáveis obrigatórias no arquivo .env: ${ausentes.join(', ')}`
    )
  }

  return {
    senha: Cypress.env('BOOKSTORE_PASSWORD'),
    prefixo: Cypress.env('BOOKSTORE_USERNAME_PREFIX'),
  }
}

function exigirCredenciais(credenciais) {
  if (!credenciais || !credenciais.userName || !credenciais.password) {
    throw new Error('As credenciais do usuário criado são obrigatórias.')
  }
}

function criarUsuario() {
  const { senha, prefixo } = obterConfiguracao()
  const userName = `${prefixo}${Date.now()}`

  return cy
    .request({
      method: 'POST',
      url: '/Account/v1/User',
      body: {
        userName,
        password: senha,
      },
      log: false,
    })
    .then((response) => {
      const username = response.body && response.body.username

      Cypress.log({
        name: 'criarUsuario',
        message: `HTTP ${response.status} username=${username || userName}`,
      })

      return {
        status: response.status,
        body: response.body,
        userID: response.body && response.body.userID,
        username,
        credenciais: {
          userName,
          password: senha,
        },
      }
    })
}

function gerarToken(credenciais) {
  exigirCredenciais(credenciais)

  return cy
    .request({
      method: 'POST',
      url: '/Account/v1/GenerateToken',
      body: {
        userName: credenciais.userName,
        password: credenciais.password,
      },
      log: false,
    })
    .then((response) => {
      Cypress.log({
        name: 'gerarToken',
        message: `HTTP ${response.status}, status=${response.body && response.body.status}, token oculto`,
      })

      return {
        status: response.status,
        body: response.body,
        statusToken: response.body && response.body.status,
        token: response.body && response.body.token,
      }
    })
}

function validarAutorizacao(credenciais) {
  exigirCredenciais(credenciais)

  return cy
    .request({
      method: 'POST',
      url: '/Account/v1/Authorized',
      body: {
        userName: credenciais.userName,
        password: credenciais.password,
      },
      log: false,
    })
    .then((response) => {
      Cypress.log({
        name: 'validarAutorizacao',
        message: `HTTP ${response.status}, autorizado=${response.body === true}`,
      })

      return {
        status: response.status,
        body: response.body,
      }
    })
}

module.exports = {
  criarUsuario,
  gerarToken,
  validarAutorizacao,
}

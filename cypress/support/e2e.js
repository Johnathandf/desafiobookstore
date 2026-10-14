require('cypress-mochawesome-reporter/register')
require('cypress-real-events')

// Arquivo de suporte carregado antes de cada spec.
// As funções de API da conta ficam em ./api/account-api.js
// e são importadas pelos testes que precisam delas.

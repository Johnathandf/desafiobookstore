# Desafio Book Store API e frontend com Cypress

Projeto de automação de testes da DemoQA com Cypress e JavaScript. São dois conjuntos no mesmo repositório:

- **API** da [Book Store](https://bookstore.toolsqa.com/swagger/), em `https://bookstore.toolsqa.com`
- **Frontend** do [DemoQA](https://demoqa.com), com Practice Form, Browser Windows, Progress Bar e Sortable

A instalação é única. A execução pode ser da API, do frontend ou dos dois juntos.

## Tecnologias

- Node.js
- JavaScript
- Cypress
- dotenv
- API REST

## API base

- Base URL: `https://bookstore.toolsqa.com`
- Swagger: `https://bookstore.toolsqa.com/swagger/`

## Pré-requisitos

- Node.js 18 ou superior
- npm

## Instalação em uma máquina nova

Vale para a API e para o frontend. Clone o repositório e instale as dependências na pasta do projeto. O `npm install` instala o Cypress, o dotenv e o gerador de relatório, e baixa o binário do Cypress.

```bash
git clone <url-do-repositorio>
cd desafio-bookstore-api-cypress
npm install
cp .env.example .env
```

O `.env` não vem no clone. Ele é necessário para os testes de conta da API. Preencha `BOOKSTORE_PASSWORD` com uma senha aceita pela API: no mínimo 8 caracteres, com letra maiúscula, letra minúscula, número e caractere especial. O prefixo pode continuar `usuario`.

```bash
BOOKSTORE_PASSWORD=
BOOKSTORE_USERNAME_PREFIX=usuario
```

O arquivo `.env` fica fora do Git. O `.env.example` só documenta os nomes das variáveis, sem credenciais. Os testes de frontend não usam essa senha. O comando `npm test` roda os dois conjuntos, então o `.env` precisa estar preenchido.

## Execução dos testes

### API e frontend juntos

```bash
npm test
```

O mesmo conjunto também pode ser executado com:

```bash
npm run cy:run
```

Interface interativa do Cypress:

```bash
npm run cy:open
```

Relatório HTML da execução:

```bash
npm run test:report
```

O arquivo gerado fica em `cypress/results/relatorio-bookstore.html`. Essa pasta não entra no Git.

### API

A base da API é `https://bookstore.toolsqa.com`, definida em `cypress.config.js`. Os testes de conta leem a senha do `.env`.

Todos os specs de API:

```bash
npx cypress run --spec "cypress/e2e/books/**/*.cy.js,cypress/e2e/account/**/*.cy.js"
```

Um cenário por vez:

```bash
npx cypress run --spec "cypress/e2e/books/listar-livros.cy.js"
npx cypress run --spec "cypress/e2e/account/criar-usuario.cy.js"
npx cypress run --spec "cypress/e2e/account/gerar-token.cy.js"
npx cypress run --spec "cypress/e2e/account/validar-autorizacao.cy.js"
```

Para ver a execução no Chrome, com a janela aberta no final:

```bash
npx cypress run --headed --no-exit --browser chrome --spec "cypress/e2e/account/criar-usuario.cy.js"
```

### Frontend

O endereço `https://demoqa.com` fica nas páginas em `cypress/support/pages/`. Esses testes não dependem da senha da API.

Todos os specs de frontend:

```bash
npx cypress run --spec "cypress/e2e/frontend/**/*.cy.js"
```

Um cenário por vez:

```bash
npx cypress run --spec "cypress/e2e/frontend/practice-form.cy.js"
npx cypress run --spec "cypress/e2e/frontend/browser-windows.cy.js"
npx cypress run --spec "cypress/e2e/frontend/progress-bar.cy.js"
npx cypress run --spec "cypress/e2e/frontend/sortable.cy.js"
```

Para ver a execução no Chrome, com a janela aberta no final:

```bash
npx cypress run --headed --no-exit --browser chrome --spec "cypress/e2e/frontend/progress-bar.cy.js"
```

A Progress Bar guarda um print de cada validação em `evidencias/progress-bar/`.

## Estrutura do projeto

```text
.
├── cypress/
│   ├── e2e/
│   │   ├── account/
│   │   │   ├── criar-usuario.cy.js
│   │   │   ├── gerar-token.cy.js
│   │   │   └── validar-autorizacao.cy.js
│   │   ├── books/
│   │   │   └── listar-livros.cy.js
│   │   └── frontend/
│   │       ├── browser-windows.cy.js
│   │       ├── practice-form.cy.js
│   │       ├── progress-bar.cy.js
│   │       └── sortable.cy.js
│   └── support/
│       ├── api/
│       │   └── account-api.js
│       ├── pages/
│       │   ├── browser-windows-page.js
│       │   ├── demoqa.js
│       │   ├── practice-form-page.js
│       │   ├── progress-bar-page.js
│       │   └── sortable-page.js
│       └── e2e.js
├── evidencias/
│   └── progress-bar/
├── .env.example
├── .gitignore
├── cypress.config.js
├── package.json
└── README.md
```

A URL base fica centralizada em `cypress.config.js`. Os testes usam `cy.request()` e caminhos relativos, sem hardcode da URL completa.

Os cenários de token e autorização criam o próprio usuário no `before()`, porque cada spec do Cypress é isolado e precisa poder rodar sozinho. Nesta API, `POST /Account/v1/Authorized` responde `false` até que `POST /Account/v1/GenerateToken` tenha sido chamado com as mesmas credenciais. O spec de autorização faz essa preparação no `before()` e o teste valida somente a autorização.

## Testes implementados

### Listar livros — `GET /BookStore/v1/Books`

Arquivo: `cypress/e2e/books/listar-livros.cy.js`

O teste verifica:

- Status HTTP `200`
- Existência da propriedade `books` no JSON
- Que `books` é um array com pelo menos um item
- Que cada livro contém os campos principais: `isbn`, `title`, `subTitle`, `author`, `publish_date`, `publisher`, `pages`, `description` e `website`
- Tipos básicos dos campos mais relevantes (`isbn`, `title`, `author` e `pages`)

### Criar usuário — `POST /Account/v1/User`

Arquivo: `cypress/e2e/account/criar-usuario.cy.js`

O teste verifica:

- Status HTTP `201`
- Presença e tipo de `userID`
- Presença de `username` e igualdade com o nome enviado

### Gerar token — `POST /Account/v1/GenerateToken`

Arquivo: `cypress/e2e/account/gerar-token.cy.js`

O teste verifica:

- Status HTTP `200`
- Campo `status` igual a `Success`
- Presença de um token sem imprimir o valor

### Autorizar usuário — `POST /Account/v1/Authorized`

Arquivo: `cypress/e2e/account/validar-autorizacao.cy.js`

O teste verifica:

- Status HTTP `200`
- Corpo booleano `true`

## Fluxo planejado

Ainda não implementado:

1. Reservar dois livros — `POST /BookStore/v1/Books`
2. Consultar o usuário e os livros reservados — `GET /Account/v1/User/{userId}`

## Segurança

Este repositório não versiona senhas, tokens ou credenciais. `BOOKSTORE_PASSWORD` e `BOOKSTORE_USERNAME_PREFIX` ficam no `.env`, já ignorado pelo Git. As requisições que enviam senha ou recebem token usam `log: false` e não escrevem esses valores no log.

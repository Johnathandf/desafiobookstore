require('dotenv').config()

const fs = require('fs')
const path = require('path')
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Book Store API',
    reportDir: 'cypress/results',
    reportFilename: 'relatorio-bookstore',
    overwrite: true,
    inlineAssets: true,
    embeddedScreenshots: true,
    saveAllAttempts: false,
  },
  e2e: {
    baseUrl: 'https://bookstore.toolsqa.com',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    video: false,
    screenshotOnRunFailure: false,
    setupNodeEvents(on) {
      require('cypress-mochawesome-reporter/plugin')(on)

      on('after:screenshot', (details) => {
        if (!details.path.includes('progress-bar')) {
          return
        }

        const pasta = path.join(process.cwd(), 'evidencias', 'progress-bar')
        fs.mkdirSync(pasta, { recursive: true })
        fs.copyFileSync(details.path, path.join(pasta, path.basename(details.path)))
      })
    },
    env: {
      BOOKSTORE_PASSWORD: process.env.BOOKSTORE_PASSWORD,
      BOOKSTORE_USERNAME_PREFIX: process.env.BOOKSTORE_USERNAME_PREFIX,
    },
  },
})

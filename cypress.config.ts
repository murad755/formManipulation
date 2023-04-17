const { defineConfig } = require('cypress')
const fs = require('fs')

module.exports = defineConfig({
    defaultCommandTimeout: 60000,
    responseTimeout: 60000,
    viewportWidth: 1920,
    viewportHeight: 1080,
    watchForFileChanges: false,
    chromeWebSecurity: false,
    e2e: {
        setupNodeEvents(on, _) {
            on('task', {
                readfile(filename) {
                    if (fs.existsSync(filename)) {
                        return fs.readFileSync(filename, 'utf8')
                    }

                    return null
                },
            })
        },
        specPattern: ['cypress/e2e/form/practice.cy.ts'],
    },
})

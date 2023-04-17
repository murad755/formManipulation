/// <reference types="cypress" />

describe('example to-do app', () => {
    beforeEach(() => {

    })

    it.skip('Trigger alert', () => {
        cy.visit('/')

        cy.task('readfile', 'cypress/fixtures/alert-text.txt').then((textOrNull) => {
            textOrNull && alert(textOrNull)
        })
    })

    it('Trigger alert', () => {
        cy.intercept('POST', 'https://api-iam.intercom.io/messenger/web/ping').as('loading')
        cy.visit('/')
        cy.wait('@loading')


        cy.get('#dropdown-class-example').should('exist').and('be.visible')
        //click dropdown
        cy.get('#dropdown-class-example').select('Option2')
        // verify option 2 is selected
        cy.get('#dropdown-class-example').should('have.value', 'option2')

        // select file upload and upload file
        cy.get('.image-upload-wrapper > input').attachFile('alert-text.txt')

    })
})

/// <reference types="cypress" />

import FormPage, { formSelectors } from '../../support/PageObjects/form'

describe('example to-do app', () => {
    beforeEach(() => {
        const formPage = new FormPage()
        formPage.visit()
    })

    it('Check dropdown', () => {
        const formPage = new FormPage()

        formPage.selectOptionFromDropDown(
            formSelectors.dropDown,
            'Option2',
            'option2'
        )
    })

    it('Upload image', () => {
        const formPage = new FormPage()

        // select file upload and upload file
        formPage.uploadFile(formSelectors.fileUpload, 'cat.jpeg')
    })

    it('Open new tab', () => {
        const formPage = new FormPage()

        formPage.openNewTab(formSelectors.openTab)
    })

    it('Invoke alert and confirmation modals', () => {
        const formPage = new FormPage()

        formPage.invokeAlertAndConfirmationModals(
            'Murad',
            formSelectors.nameInput,
            formSelectors.alertButton,
            formSelectors.confirmButton
        )
    })

    it('Hide and show textbox', () => {
        const formPage = new FormPage()

        formPage.hideAndShowTextbox(
            formSelectors.hideTextbox,
            formSelectors.showTextbox,
            formSelectors.displayedText
        )
    })

    it('Mouse hover', () => {
        const formPage = new FormPage()

        formPage.mouseHover(
            formSelectors.mouseHover,
            formSelectors.hoverContent
        )
    })

    it('Iframe verification', () => {
        const formPage = new FormPage()

        formPage.getIframeBody(formSelectors.iframe)
    })

    it('Trigger alert', () => {
        cy.task('readfile', 'cypress/fixtures/alert-text.txt').then(
            (textOrNull) => {
                textOrNull && alert(textOrNull)
            }
        )
    })
})

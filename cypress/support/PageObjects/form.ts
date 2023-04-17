export const formSelectors = {
    dropDown: '#dropdown-class-example',
    fileUpload: '.image-upload-wrapper > input',
    openTab: '#opentab',
    alertButton: '#alertbtn',
    confirmButton: '#confirmbtn',
    nameInput: '#name',
    hideTextbox: '#hide-textbox',
    showTextbox: '#show-textbox',
    displayedText: '#displayed-text',
    mouseHover: '.hover-container > .btn',
    hoverContent: '.hover-content',
    iframe: '#courses-iframe',
}

class FormPage {
    visit() {
        cy.intercept(
            'POST',
            'https://api-iam.intercom.io/messenger/web/ping'
        ).as('loading')
        cy.visit('/')
        cy.wait('@loading')
    }

    selectOptionFromDropDown(
        dropDownSelector: string,
        option: string,
        value: string
    ) {
        cy.get(dropDownSelector).select(option)

        cy.get(dropDownSelector).should('exist').and('be.visible')
        cy.get(dropDownSelector).select(option)
        cy.get(dropDownSelector).should('have.value', value)
    }

    uploadFile(fileUploadSelector: string, fileName: string) {
        // select file upload and upload file
        cy.get(fileUploadSelector).attachFile(fileName)
    }

    openNewTab(openTabSelector: string) {
        cy.get(openTabSelector).should('exist').and('be.visible')

        cy.window().then((win) => {
            cy.stub(win, 'open', (url) => {
                expect(url).to.equal('https://easygenerator.com')
            }).as('popup')
        })

        cy.get(openTabSelector).click()

        cy.get('@popup').should('be.called')
    }

    invokeAlertAndConfirmationModals(
        name: string,
        nameInputSelector: string,
        alertButtonSelector: string,
        confirmButtonSelector: string
    ) {
        // alert
        cy.get(nameInputSelector).should('exist').and('be.visible')
        cy.get(nameInputSelector).type(name)

        cy.on('window:alert', (str) => {
            expect(str).to.equal(
                `Hello ${name}, share this practice page and share your knowledge`
            )
            return false
        })

        cy.get(alertButtonSelector).click()

        // confirmation
        cy.get(nameInputSelector).type(name)
        cy.on('window:confirm', (str) => {
            expect(str).to.equal(
                `Hello ${name}, Are you sure you want to confirm?`
            )
            return false
        })

        cy.get(confirmButtonSelector).click()
    }

    hideAndShowTextbox(
        hideTextboxSelector: string,
        showTextboxSelector: string,
        displayedTextSelector: string
    ) {
        cy.get(showTextboxSelector).should('exist').and('be.visible')
        cy.get(showTextboxSelector).click()

        cy.get(displayedTextSelector).should('exist').and('be.visible')

        cy.get(hideTextboxSelector).should('exist').and('be.visible')
        cy.get(hideTextboxSelector).click()

        cy.get(showTextboxSelector).click()
    }

    mouseHover(mouseHoverSelector: string, hoverContentSelector: string) {
        cy.get(mouseHoverSelector).should('exist').and('be.visible')
        cy.get(mouseHoverSelector).trigger('mouseover')

        cy.get(hoverContentSelector).should('exist').and('be.visible')
    }

    getIframeBody(iframe: string) {
        return cy
            .get(iframe)
            .its('0.contentDocument')
            .should('exist')
            .its('body')
            .should('not.be.undefined')
            .then(cy.wrap)
    }
}

export default FormPage

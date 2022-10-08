describe('Blog app', () => {
    beforeEach(() => {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')

        const user = {
            name: 'Arnold Schwarzenegger',
            username: 'arnie',
            password: 'pump'
        }
        cy.request('POST', 'http://localhost:3003/api/users', user)

        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', () => {
        cy.contains('Log in to application')
        cy.contains('username')
        cy.contains('password')
        cy.contains('login')
        cy.get('input[name=Username]')
        cy.get('input[name=Password]')
    })

    describe('Login', () => {
        it('succeeds with correct credentials', () => {
            cy.get('input[name=Username]').type('arnie')
            cy.get('input[name=Password]').type('pump')
            cy.contains('login').click()
            cy.contains('Arnold Schwarzenegger logged in')
        })

        it('with wrong credentials', () => {
            cy.get('input[name=Username]').type('arnie')
            cy.get('input[name=Password]').type('pumping')
            cy.contains('login').click()

            cy.get('.error')
                .should('contain', 'Wrong credentials')
                .and('have.css', 'color', 'rgb(255, 0, 0)')
                .and('have.css', 'border-style', 'solid')
        })
    })
})
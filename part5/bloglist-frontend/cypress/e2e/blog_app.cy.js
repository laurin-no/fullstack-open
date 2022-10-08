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

    describe('When logged in', () => {
        beforeEach(() => {
            cy.login({ username: 'arnie', password: 'pump' })
        })

        it('A blog can be created', () => {
            cy.contains('create new blog').click()
            cy.get('input[name=Title]').type('Blog about building your body')
            cy.get('input[name=Author]').type('Arnold the GOAT')
            cy.get('input[name=Url]').type('https://blog.arnold.com/pumpingiron')

            cy.get('button[type=Submit]').click()

            cy.contains('Created new blog')
            cy.contains('Blog about building your body')
        })

        describe('and a blog exists', () => {
            beforeEach(() => {
                cy.createBlog({
                    title: 'Light weight baby',
                    author: 'Ronnie Coleman',
                    url: 'blog.lightweight.com/baby'
                })
            })

            it.only('can be liked', () => {
                cy.contains('Light weight baby').contains('view').click()
                cy.contains('Light weight baby').contains('like').click()
                cy.contains('Light weight baby').contains('like').click()

                cy.contains('Light weight baby').contains('likes 2')
            })
        })
    })
})
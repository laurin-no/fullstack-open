describe('Blog app', () => {
    beforeEach(() => {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')

        const userA = {
            name: 'Arnold Schwarzenegger',
            username: 'arnie',
            password: 'pump',
        }

        const userB = {
            name: 'Buster Bluth',
            username: 'buster',
            password: 'mom',
        }

        cy.createUser(userA)
        cy.createUser(userB)

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
            cy.get('input[name=Url]').type(
                'https://blog.arnold.com/pumpingiron'
            )

            cy.get('button[type=Submit]').click()

            cy.contains('Created new blog')
            cy.contains('Blog about building your body')
        })

        describe('and a blog exists', () => {
            beforeEach(() => {
                cy.createBlog({
                    title: 'Light weight baby',
                    author: 'Ronnie Coleman',
                    url: 'blog.lightweight.com/baby',
                })
            })

            it('can be liked', () => {
                cy.contains('Light weight baby').contains('view').click()
                cy.contains('Light weight baby').contains('like').click()
                cy.contains('Light weight baby').contains('like').click()

                cy.contains('Light weight baby').contains('likes 2')
            })

            it('can be deleted by the creator', () => {
                cy.contains('Light weight baby').contains('view').click()
                cy.contains('Light weight baby').contains('delete').click()

                cy.get('html').should('not.contain', 'Light weight baby')
            })

            it('cannot be deleted by another user than the creator', () => {
                cy.login({ username: 'buster', password: 'mom' })
                cy.contains('Light weight baby').contains('view').click()

                cy.get('.blog button:visible').should('not.contain', 'delete')
            })
        })

        describe('and multiple blogs exist', () => {
            beforeEach(() => {
                cy.createBlog({
                    title: 'The title with the most likes',
                    author: 'Well liked author',
                    url: 'good.blog.com',
                })
                cy.createBlog({
                    title: 'The title with the second most likes',
                    author: 'Not so well liked author',
                    url: 'not.so.good.blog.com',
                })
            })

            it('should be sorted by likes', () => {
                cy.contains('The title with the second most likes')
                    .contains('view')
                    .click()
                cy.contains('The title with the second most likes')
                    .contains('like')
                    .click()
                cy.contains('The title with the second most likes')
                    .contains('like')
                    .click()

                cy.contains('The title with the most likes')
                    .contains('view')
                    .click()
                cy.contains('The title with the most likes')
                    .contains('like')
                    .click()
                cy.contains('The title with the most likes')
                    .contains('like')
                    .click()
                cy.contains('The title with the most likes')
                    .contains('like')
                    .click()

                cy.wait(500)

                cy.get('.blog')
                    .eq(0)
                    .should('contain', 'The title with the most likes')
                cy.get('.blog')
                    .eq(1)
                    .should('contain', 'The title with the second most likes')
            })
        })
    })
})

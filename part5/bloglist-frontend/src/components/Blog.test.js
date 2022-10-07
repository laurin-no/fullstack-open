import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('<Blog />', () => {

    const blog = {
        author: 'linus torvalds',
        title: 'linux blog',
        url: 'https://blog.linux.org',
        likes: 2,
        user: {
            username: 'tux',
            name: 'Urho Kekkonen'
        }
    }

    const user = {
        username: 'tux'
    }

    let container

    beforeEach(() => {
        container = render(<Blog blog={blog} user={user}/>).container
    })

    test('displays only blog title and author by default', () => {
        const blogContainer = container.querySelector('.blog')
        const toggleContainer = container.querySelector('.toggleable')

        expect(blogContainer).toHaveTextContent('linux blog linus torvalds')
        expect(toggleContainer).toHaveStyle('display: none')
    })

    test('show blog details when relevant button is clicked', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('view')
        await user.click(button)

        const toggleContainer = container.querySelector('.toggleable')
        expect(toggleContainer).not.toHaveStyle('display: none')
        expect(toggleContainer.textContent).toContain('https://blog.linux.orglikes 2')
    })
})


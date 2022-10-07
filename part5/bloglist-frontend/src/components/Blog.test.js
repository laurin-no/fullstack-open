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
    const mockHandler = jest.fn()

    beforeEach(() => {
        jest.clearAllMocks()
        container = render(<Blog blog={blog} user={user} updateBlog={mockHandler}/>).container
    })

    test('displays only blog title and author by default', () => {
        const blogContainer = container.querySelector('.blog')
        const toggleContainer = container.querySelector('.toggleable')

        expect(blogContainer).toHaveTextContent('linux blog linus torvalds')
        expect(toggleContainer).toHaveStyle('display: none')
    })

    test('shows blog details when relevant button is clicked', async () => {
        const userMock = userEvent.setup()
        const button = screen.getByText('view')
        await userMock.click(button)

        const toggleContainer = container.querySelector('.toggleable')
        expect(toggleContainer).not.toHaveStyle('display: none')
        expect(toggleContainer.textContent).toContain('https://blog.linux.orglikes 2')
    })

    test('handles 2 clicks of the like button by calling the event handler twice', async () => {
        const userMock = userEvent.setup()
        const button = screen.getByText('like')
        await userMock.click(button)
        await userMock.click(button)

        expect(mockHandler.mock.calls).toHaveLength(2)
    })
})


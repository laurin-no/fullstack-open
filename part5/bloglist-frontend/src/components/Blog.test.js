import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'
import { render } from '@testing-library/react'

test('only blog title and author are displayed by default', async () => {
    const blog = {
        author: 'linus torvalds',
        title: 'linux blog',
        likes: 2,
        user: {
            username: 'tux'
        }
    }

    const user = {
        username: 'tux'
    }

    const { container } = render(<Blog blog={blog} user={user}/>)
    const blogContainer = container.querySelector('.blog')
    const toggleContainer = container.querySelector('.toggleable')

    expect(blogContainer).toHaveTextContent('linux blog linus torvalds')
    expect(toggleContainer).toHaveStyle('display: none')
})
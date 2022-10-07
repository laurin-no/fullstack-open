import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm/> updates parent state and calls onSubmit', async () => {
    const createBlog = jest.fn()
    const user = userEvent.setup()

    const { container } = render(<BlogForm createBlog={createBlog}/>)

    const titleInput = container.querySelector('input[name="Title"]')
    const authorInput = container.querySelector('input[name="Author"]')
    const urlInput = container.querySelector('input[name="Url"]')
    const submitButton = screen.getByText('create')

    await user.type(titleInput, 'test title')
    await user.type(authorInput, 'test author')
    await user.type(urlInput, 'blog.example.com')
    await user.click(submitButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0]).toEqual({ author: 'test author', title: 'test title', url: 'blog.example.com' })
})
import { useState } from 'react'
import { setNotification } from '../reducers/notificationReducer'
import { setError } from '../reducers/errorReducer'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { Button, Form } from 'react-bootstrap'

const BlogForm = ({ innerRef }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const dispatch = useDispatch()

    const addBlog = async (event) => {
        event.preventDefault()
        innerRef.current.toggleVisibility()

        const blogObject = {
            title,
            author,
            url,
        }

        try {
            dispatch(createBlog(blogObject))
            dispatch(setNotification('Created new blog', 5))
        } catch (e) {
            dispatch(setError('Creation failed', 5))
        }

        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <Form onSubmit={addBlog} className="w-50 p-3">
            <Form.Group controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
                    value={title}
                    name="Title"
                    onChange={({ target }) => setTitle(target.value)}
                />
            </Form.Group>
            <Form.Group controlId="formAuthor">
                <Form.Label>Author</Form.Label>
                <Form.Control
                    type="text"
                    value={author}
                    name="Author"
                    onChange={({ target }) => setAuthor(target.value)}
                />
            </Form.Group>
            <Form.Group controlId="formUrl">
                <Form.Label>URL</Form.Label>
                <Form.Control
                    type="text"
                    value={url}
                    name="Url"
                    onChange={({ target }) => setUrl(target.value)}
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Create
            </Button>
        </Form>
    )
}

export default BlogForm

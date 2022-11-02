import { useState } from 'react'
import { setNotification } from '../reducers/notificationReducer'
import { setError } from '../reducers/errorReducer'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'

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
        <form onSubmit={addBlog}>
            <div>
                title:
                <input
                    type="text"
                    value={title}
                    name="Title"
                    onChange={({ target }) => setTitle(target.value)}
                />
            </div>
            <div>
                author:
                <input
                    type="text"
                    value={author}
                    name="Author"
                    onChange={({ target }) => setAuthor(target.value)}
                />
            </div>
            <div>
                url:
                <input
                    type="text"
                    value={url}
                    name="Url"
                    onChange={({ target }) => setUrl(target.value)}
                />
            </div>
            <button type="submit">create</button>
        </form>
    )
}

export default BlogForm

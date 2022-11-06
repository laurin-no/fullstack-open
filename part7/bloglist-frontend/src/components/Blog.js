import { useDispatch, useSelector } from 'react-redux'
import { addComment, deleteBlog, likeBlog } from '../reducers/blogReducer'
import { useState } from 'react'
import { setError } from '../reducers/errorReducer'

const Blog = ({ blog }) => {
    const dispatch = useDispatch()

    const user = useSelector((state) => state.user)

    const [comment, setComment] = useState('')

    const handleLike = async (blogObject, user) => {
        const blog = { ...blogObject, user: user.id }
        dispatch(likeBlog(blog))
    }

    const handleDelete = async (blog) => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            dispatch(deleteBlog(blog))
        }
    }

    if (!blog || !user) {
        return null
    }

    const showDelete = {
        display: blog.user.username === user.username ? '' : 'none',
    }

    const handleCommentSubmit = async (event) => {
        event.preventDefault()

        try {
            dispatch(addComment(blog.id, comment))
        } catch (e) {
            dispatch(setError('Adding of comment failed', 5))
        }

        setComment('')
    }

    return (
        <div>
            <h2>
                {blog.title} {blog.author}
            </h2>
            <a href={blog.url} target="_blank" rel="noreferrer">
                {blog.url}
            </a>
            <br />
            likes {blog.likes ? blog.likes : 0}
            <button onClick={() => handleLike(blog, user)}>like</button>
            <br />
            added by {blog.user.name}
            <br />
            <button onClick={() => handleDelete(blog)} style={showDelete}>
                delete
            </button>
            <h3>comments</h3>
            <form onSubmit={handleCommentSubmit}>
                <input
                    type="text"
                    value={comment}
                    name="Comment"
                    onChange={({ target }) => setComment(target.value)}
                />
                <button type="submit">add comment</button>
            </form>
            <ul>
                {blog.comments.map((comment, index) => (
                    <li key={index}>{comment}</li>
                ))}
            </ul>
        </div>
    )
}

export default Blog

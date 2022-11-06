import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
    const dispatch = useDispatch()

    const user = useSelector((state) => state.user)

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
            <ul>
                {blog.comments.map((comment, index) => (
                    <li key={index}>{comment}</li>
                ))}
            </ul>
        </div>
    )
}

export default Blog

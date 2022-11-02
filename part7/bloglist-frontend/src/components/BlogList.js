import { useDispatch, useSelector } from 'react-redux'
import Blog from './Blog'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'

const BlogList = () => {
    const dispatch = useDispatch()
    const blogs = useSelector(({ blogs }) => {
        return [...blogs].sort((a, b) => b.likes - a.likes)
    })

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

    return (
        <div>
            {blogs.map((blog) => (
                <Blog
                    key={blog.id}
                    blog={blog}
                    handleLike={handleLike}
                    handleDelete={handleDelete}
                    user={user}
                />
            ))}
        </div>
    )
}

export default BlogList

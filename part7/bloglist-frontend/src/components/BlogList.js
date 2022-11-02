import { useDispatch, useSelector } from 'react-redux'
import Blog from './Blog'
import blogService from '../services/blogs'
import { setError } from '../reducers/errorReducer'

const BlogList = () => {
    const dispatch = useDispatch()
    const blogs = useSelector(({ blogs }) => {
        return [...blogs].sort((a, b) => b.likes - a.likes)
    })

    const setBlogs = () => console.log('setBlogs is deprecated')
    const user = {}

    const updateBlog = async (blogObject) => {
        try {
            const blogRes = await blogService.update(blogObject)

            setBlogs((prevState) =>
                prevState.map((b) => (b.id === blogRes.id ? blogRes : b))
            )
        } catch (e) {
            dispatch(setError('Blog update failed', 5))
        }
    }

    const deleteBlog = async (blog) => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            await blogService.deleteById(blog.id)
            setBlogs((prevState) => prevState.filter((b) => b.id !== blog.id))
        }
    }

    return (
        <div>
            {blogs.map((blog) => (
                <Blog
                    key={blog.id}
                    blog={blog}
                    updateBlog={updateBlog}
                    deleteBlog={deleteBlog}
                    user={user}
                />
            ))}
        </div>
    )
}

export default BlogList

import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = () => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
    }

    const blogs = useSelector(({ blogs }) => {
        return [...blogs].sort((a, b) => b.likes - a.likes)
    })

    return (
        <div>
            {blogs.map((blog) => (
                <div key={blog.id} style={blogStyle} className="blog">
                    <Link to={`/blogs/${blog.id}`}>
                        {blog.title} {blog.author}
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default BlogList

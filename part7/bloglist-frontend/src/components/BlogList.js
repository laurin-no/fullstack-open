import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const BlogList = () => {
    const blogs = useSelector(({ blogs }) => {
        return [...blogs].sort((a, b) => b.likes - a.likes)
    })

    return (
        <Table striped hover>
            <thead>
                <tr>
                    <th>Blog Title</th>
                    <th>Author</th>
                </tr>
            </thead>
            <tbody>
                {blogs.map((blog) => (
                    <tr key={blog.id}>
                        <td>
                            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                        </td>
                        <td>{blog.author}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

export default BlogList

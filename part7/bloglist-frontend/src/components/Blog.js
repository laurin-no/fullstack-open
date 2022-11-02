import { useState } from 'react'

const Blog = ({ blog, handleLike, handleDelete, user }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
    }

    const [visible, setVisible] = useState(false)
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    const showDelete = {
        display: blog.user.username === user.username ? '' : 'none',
    }

    return (
        <div style={blogStyle} className="blog">
            {blog.title} {blog.author}
            <button onClick={toggleVisibility}>
                {visible ? 'hide' : 'view'}
            </button>
            <div style={showWhenVisible} className="toggleable">
                {blog.url}
                <br />
                likes {blog.likes}
                <button onClick={() => handleLike(blog, user)}>like</button>
                <br />
                {blog.user.name}
                <br />
                <button onClick={() => handleDelete(blog)} style={showDelete}>
                    delete
                </button>
            </div>
        </div>
    )
}

export default Blog

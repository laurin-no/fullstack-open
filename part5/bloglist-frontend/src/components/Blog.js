import { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const [visible, setVisible] = useState(false)
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    const showDelete = { display: blog.user.username === user.username ? '' : 'none' }


    const handleLike = () => {
        const likes = blog.likes ? blog.likes + 1 : 1
        const user = blog.user.id

        const blogReq = { ...blog, likes, user }

        updateBlog(blogReq)
    }

    return (
        <div style={blogStyle}>
            {blog.title} {blog.author}
            <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
            <div style={showWhenVisible}>
                {blog.url}<br/>
                likes {blog.likes}
                <button onClick={handleLike}>like</button>
                <br/>
                {blog.user.name}<br/>
                <button onClick={() => deleteBlog(blog)} style={showDelete}>delete</button>
            </div>
        </div>
    )
}

export default Blog
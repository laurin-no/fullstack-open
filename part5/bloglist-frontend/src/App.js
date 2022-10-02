import { useEffect, useRef, useState } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Error from './components/Error'
import Toggleable from './components/Toggleable'
import BlogForm from './components/BlogForm'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    const [notificationMessage, setNotificationMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    const blogFormRef = useRef()

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])

    useEffect(() => {
        const loggedUserJson = window.localStorage.getItem('loggedUser')
        if (loggedUserJson) {
            const user = JSON.parse(loggedUserJson)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({ username, password })

            window.localStorage.setItem(
                'loggedUser', JSON.stringify(user)
            )

            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            setErrorMessage('Wrong credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const handleLogout = () => {
        window.localStorage.removeItem('loggedUser')
        setUser(null)
    }

    const createBlog = async (blogObject) => {
        blogFormRef.current.toggleVisibility()
        try {
            const blogRes = await blogService.create(blogObject)
            setBlogs(prevState => [...prevState, blogRes])

            setNotificationMessage('Created new blog')
            setTimeout(() => {
                setNotificationMessage(null)
            }, 5000)

        } catch (e) {
            setErrorMessage('Creation failed')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const updateBlog = async (blogObject) => {
        try {
            const blogRes = await blogService.update(blogObject)

            setBlogs(prevState => prevState.map(b => b.id === blogRes.id ? blogRes : b))
        } catch (e) {
            setErrorMessage('Blog update failed')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const deleteBlog = async (blog) => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            await blogService.deleteById(blog.id)
            setBlogs(prevState => prevState.filter(b => b.id !== blog.id))
        }
    }

    const loginForm = () => {
        return (
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        )
    }

    const blogForm = () => (
        <Toggleable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm createBlog={createBlog}/>
        </Toggleable>
    )


    if (user === null) {
        return (
            <div>
                <h2>Log in to application</h2>
                <Notification message={notificationMessage}/>
                <Error message={errorMessage}/>
                {loginForm()}
            </div>
        )
    }

    return (
        <div>
            <h2>blogs</h2>
            <Notification message={notificationMessage}/>
            <Error message={errorMessage}/>

            <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>

            <h2>create new</h2>

            {blogForm()}

            {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
                <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} user={user}/>
            )}
        </div>
    )
}

export default App

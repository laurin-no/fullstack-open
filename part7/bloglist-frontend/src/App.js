import { useEffect, useRef, useState } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Error from './components/Error'
import Toggleable from './components/Toggleable'
import BlogForm from './components/BlogForm'
import { useDispatch } from 'react-redux'
import { setError } from './reducers/errorReducer'
import { initializeBlogs } from './reducers/blogReducer'
import BlogList from './components/BlogList'

const App = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    const dispatch = useDispatch()

    const blogFormRef = useRef()

    useEffect(() => {
        dispatch(initializeBlogs())
    }, [dispatch])

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

            window.localStorage.setItem('loggedUser', JSON.stringify(user))

            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            dispatch(setError('Wrong credentials', 5))
        }
    }

    const handleLogout = () => {
        window.localStorage.removeItem('loggedUser')
        setUser(null)
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

    if (user === null) {
        return (
            <div>
                <h2>Log in to application</h2>
                <Notification />
                <Error />
                {loginForm()}
            </div>
        )
    }

    return (
        <div>
            <h2>blogs</h2>
            <Notification />
            <Error />

            <p>
                {user.name} logged in{' '}
                <button onClick={handleLogout}>logout</button>
            </p>

            <Toggleable buttonLabel="create new blog" ref={blogFormRef}>
                <BlogForm innerRef={blogFormRef} />
            </Toggleable>
            <BlogList />
        </div>
    )
}

export default App

import { Link } from 'react-router-dom'

const Menu = ({ username, handleLogout }) => {
    return (
        <nav className="menu">
            <ul>
                <li>
                    <Link to="/">blogs</Link>
                </li>
                <li>
                    <Link to="/users">users</Link>
                </li>
                <li>
                    {username} logged in{' '}
                    <button onClick={handleLogout}>logout</button>
                </li>
            </ul>
        </nav>
    )
}

export default Menu

// import { Link } from 'react-router-dom'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Menu = ({ username, handleLogout }) => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    Blog App
                </Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/">
                        blogs
                    </Nav.Link>
                    <Nav.Link as={Link} to="/users">
                        users
                    </Nav.Link>
                </Nav>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>{username} logged in</Navbar.Text>
                    <Button onClick={handleLogout}>logout</Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Menu

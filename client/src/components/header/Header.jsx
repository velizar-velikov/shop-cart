import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext.jsx';

export default function Header() {
    const { isAuthenticated } = useAuthContext();
    return (
        <Navbar className="p-0" bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    Velizar fashion
                </Navbar.Brand>
                <Nav className="ml-auto navbar navbar-expand-sm justify-content-end">
                    <Nav.Link as={Link} to="/">
                        Home
                    </Nav.Link>
                    <Nav.Link as={Link} to="/catalog">
                        Catalog
                    </Nav.Link>
                    {isAuthenticated ? (
                        <>
                            <Nav.Link as={Link} to="/create">
                                Create product
                            </Nav.Link>
                            <Nav.Link as={Link} to="/logout">
                                Logout
                            </Nav.Link>
                            <Nav.Link as={Link} to="/cart" className="mx-2 mt-1 px-1 fa-lg">
                                <i className="fa-solid fa-cart-shopping"></i>
                            </Nav.Link>
                        </>
                    ) : (
                        <>
                            <Nav.Link as={Link} to="/login">
                                Login
                            </Nav.Link>
                            <Nav.Link as={Link} to="/register">
                                Register
                            </Nav.Link>
                        </>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
}

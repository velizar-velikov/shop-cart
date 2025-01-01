import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

import { useAuthContext } from '../../contexts/AuthContext.jsx';
import { useCartContext } from '../../contexts/CartContext.jsx';
import { NavDropdown } from 'react-bootstrap';
import paths from '../../config/paths.js';

const singleDigitStyle = { fontSize: '0.85rem', padding: '0.03rem 0.28rem 0.12rem 0.28rem' };
const doubleDigitStyle = { fontSize: '0.8rem', padding: '0.09rem 0.13rem 0.2rem 0.12rem' };

export default function Header() {
    const { isAuthenticated } = useAuthContext();
    const { cartItemsCount } = useCartContext();

    return (
        <Navbar className="p-0" bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand as={Link} to={paths.home.path}>
                    Velizar fashion
                </Navbar.Brand>
                <Nav className="ml-auto navbar navbar-expand-sm justify-content-end">
                    <Nav.Link as={Link} to={paths.home.path}>
                        Home
                    </Nav.Link>
                    <Nav.Link as={Link} to={paths.catalog.basePath}>
                        Catalog
                    </Nav.Link>
                    {isAuthenticated ? (
                        <>
                            <Nav.Link as={Link} to={paths.createProduct.path}>
                                Create product
                            </Nav.Link>

                            <NavDropdown title="Profile" id="basic-nav-dropdown">
                                <NavDropdown.Item as={Link} to={''}>
                                    Settings
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} to={''}>
                                    Stock
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} to={''}>
                                    Olders
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item as={Link} to={paths.logout.path}>
                                    Sign out
                                </NavDropdown.Item>
                            </NavDropdown>

                            <Nav.Link as={Link} to="/cart" className="position-relative  mx-2 mt-1 px-1">
                                <i className="fa-solid fa-cart-shopping fa-xl"></i>
                                {cartItemsCount > 0 && <CartBubble cartItemsCount={cartItemsCount} />}
                            </Nav.Link>
                        </>
                    ) : (
                        <>
                            <Nav.Link as={Link} to={paths.login.path}>
                                Login
                            </Nav.Link>
                            <Nav.Link as={Link} to={paths.register.path}>
                                Register
                            </Nav.Link>
                        </>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
}

function CartBubble({ cartItemsCount }) {
    return (
        <span
            style={cartItemsCount < 10 ? singleDigitStyle : doubleDigitStyle}
            className="position-absolute top-25 start-75 translate-middle badge rounded-circle bg-danger py-0.125 px-0.25"
        >
            {cartItemsCount}
        </span>
    );
}

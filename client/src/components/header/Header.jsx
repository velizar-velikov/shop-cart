import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Card, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import { useAuthContext } from '../../contexts/AuthContext.jsx';
import { useCartContext } from '../../contexts/CartContext.jsx';
import { useLogout } from '../../hooks/custom/useAuth.js';
import paths from '../../config/paths.js';

import Logo from '../../assets/img/shopping-cart.webp';
import styles from './header.module.css';

const singleDigitStyle = { fontSize: '0.85rem', padding: '0.03rem 0.28rem 0.12rem 0.28rem' };
const doubleDigitStyle = { fontSize: '0.8rem', padding: '0.09rem 0.13rem 0.2rem 0.12rem' };

export default function Header() {
    const { isAuthenticated } = useAuthContext();
    const { cartItemsCount } = useCartContext();

    const navigate = useNavigate();
    const logout = useLogout();

    const logoutHandler = async () => {
        await logout();
        navigate(paths.home.path);
    };

    return (
        <Navbar className="p-0" bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand className="d-flex flex-wrap flex-sm-nowrap gap-3 align-items-center" as={Link} to={paths.home.path}>
                    <Card className={styles.logo}>
                        <img src={Logo} alt="logo" className="img-fluid" />
                    </Card>
                    <span className={styles['semi-bold']}>ShopCart</span>
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

                            <NavDropdown title="Profile" align={{ sm: 'start' }} id="basic-nav-dropdown">
                                <NavDropdown.Item as={Link} to={''}>
                                    Settings
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} to={''}>
                                    Stock
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} to={paths.orders.path}>
                                    Olders
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={logoutHandler}>Sign out</NavDropdown.Item>
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

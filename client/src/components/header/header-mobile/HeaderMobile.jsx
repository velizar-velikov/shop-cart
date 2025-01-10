import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Card, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import { useAuthContext } from '../../../contexts/AuthContext.jsx';
import { useCartContext } from '../../../contexts/CartContext.jsx';
import { useLogout } from '../../../hooks/custom/useAuth.js';
import paths from '../../../config/paths.js';

import CartBubble from '../cart-bubble/CartBubble.jsx';
import Logo from '../../../assets/img/shopping-cart.webp';
import styles from '../header.module.css';

import HamburgerMenu from './hamburger-menu/HamburgerMenu.jsx';

export default function HeaderMobile() {
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
            <Container className="d-flex justify-content-between">
                <i className="fa-solid fa-bars fa-xl text-light"></i>
                {/* <HamburgerMenu /> */}

                <Navbar.Brand className="d-flex flex-wrap flex-sm-nowrap align-items-center" as={Link} to={paths.home.path}>
                    <Card className={`${styles.logo} mx-0`}>
                        <img src={Logo} alt="logo" className="img-fluid" />
                    </Card>
                </Navbar.Brand>
                <Nav className="ml-auto navbar navbar-expand-sm justify-content-end">
                    {isAuthenticated ? (
                        <>
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
                                <i className="fa-solid fa-bag-shopping fa-xl"></i>
                                {cartItemsCount > 0 && <CartBubble cartItemsCount={cartItemsCount} />}
                            </Nav.Link>
                        </>
                    ) : (
                        <>
                            <Nav.Link as={Link} to={paths.login.path}>
                                Sign in
                            </Nav.Link>
                        </>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
}

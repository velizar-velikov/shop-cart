import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Card, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import { useAuthContext } from '../../../contexts/AuthContext.jsx';
import { useCartContext } from '../../../contexts/CartContext.jsx';
import paths from '../../../config/paths.js';

import CartBubble from '../cart-bubble/CartBubble.jsx';
import Logo from '../../../assets/img/shopping-cart.webp';
import styles from '../header.module.css';

export default function HeaderDesktop({ logoutHandler }) {
    const { isAuthenticated } = useAuthContext();
    const { cartItemsCount } = useCartContext();

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
                                <NavDropdown.Item onClick={logoutHandler} as={Link} to="">
                                    Sign out
                                </NavDropdown.Item>
                            </NavDropdown>

                            <Nav.Link as={Link} to="/wishlist" className="position-relative  mx-2 mt-1 px-1">
                                <i className="fa-regular fa-heart fa-xl"></i>
                                {cartItemsCount > 0 && <CartBubble cartItemsCount={cartItemsCount} />}
                            </Nav.Link>
                            <Nav.Link as={Link} to="/cart" className="position-relative  mx-2 mt-1 px-1">
                                <i className="fa-solid fa-bag-shopping fa-xl"></i>
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

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useAuthContext } from '../../../contexts/AuthContext.tsx';
import { UseCartContext } from '../../../contexts/CartContext.tsx';
import { useWishlistContext } from '../../../contexts/WishlistContext.tsx';
import { useMenuContext } from '../../../contexts/MenuContext.tsx';

import CartBubble from '../cart-bubble/CartBubble.tsx';
import Logo from '../../../assets/img/shopping-cart.webp';
import HamburgerMenu from './hamburger-menu/HamburgerMenu.tsx';

import styles from '../header.module.css';
import paths from '../../../config/paths.ts';

interface HeaderMobileProps {
    logoutHandler: () => Promise<void>;
}

export default function HeaderMobile({ logoutHandler }: HeaderMobileProps) {
    const { isAuthenticated } = useAuthContext();
    const { cartItemsCount } = UseCartContext();
    const { wishlist } = useWishlistContext();
    const { isMenuOpened, openMenu } = useMenuContext();

    return (
        <Navbar className="p-0" bg="dark" data-bs-theme="dark">
            <Container className="d-flex justify-content-between">
                <button onClick={openMenu} className={`p-2 border-0 ${styles['btn-menu']}`}>
                    <i className="fa-solid fa-bars fa-xl text-light"></i>
                </button>
                {isMenuOpened && <HamburgerMenu logoutHandler={logoutHandler} />}

                <Navbar.Brand className="d-flex flex-wrap flex-sm-nowrap align-items-center" as={Link} to={paths.home.path}>
                    <Card className={`${styles.logo} mx-0`}>
                        <img src={Logo} alt="logo" className="img-fluid" />
                    </Card>
                </Navbar.Brand>
                <Nav className="ml-auto navbar navbar-expand-sm justify-content-end">
                    <Nav.Link as={Link} to="/wishlist" className="position-relative  mx-2 mt-1 px-1">
                        <i className="fa-regular fa-heart fa-xl"></i>
                        {wishlist.length > 0 && <CartBubble cartItemsCount={wishlist.length} />}
                    </Nav.Link>
                    {isAuthenticated ? (
                        <>
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

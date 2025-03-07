import { Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import WishlistItem from './wishlist-item/WishlistItem.tsx';
import { useWishlistContext } from '../../contexts/WishlistContext.tsx';
import { useAuthContext } from '../../contexts/AuthContext.tsx';

import styles from './wishlist.module.css';
import paths from '../../config/paths.ts';

export default function Wishlist() {
    const { isAuthenticated } = useAuthContext();
    const { wishlist } = useWishlistContext();

    return (
        <Container className={`w-100 d-flex justify-content-center align-items-center mb-5 ${styles.container}`}>
            <Container className="mt-4 mt-sm-5">
                <div className="mx-3">
                    <h2 className={styles.heading}>My wishlist</h2>
                    <p className="fs-5">
                        {wishlist.length} {wishlist.length !== 1 ? 'items' : 'item'}
                    </p>
                </div>
                {!isAuthenticated && wishlist.length !== 0 && (
                    <p className={`mx-3 ${styles.para}`}>
                        To add item to cart, please <Link to={paths.login.path}>login.</Link>
                    </p>
                )}
                {wishlist.length == 0 && (
                    <p className={`mx-3 ${styles.para}`}>
                        Your wishlist is empty. Start shopping <Link to={paths.catalog.basePath}>now.</Link>
                    </p>
                )}
                <Row className=" d-flex flex-wrap w-100 row-cols-2 row-cols-sm-2 row-cols-md-4 row-cols-lg-4 g-1 g-sm-2 g-xl-3 m-auto">
                    {wishlist.map((product) => (
                        <WishlistItem key={product._id} {...product} />
                    ))}
                </Row>
            </Container>
        </Container>
    );
}

import { Container, Row } from 'react-bootstrap';
import WishlistItem from './wishlist-item/WishlistItem.jsx';
import { useWishlistContext } from '../../contexts/WishlistContext.jsx';

import styles from './wishlist.module.css';
import { Link } from 'react-router-dom';
import paths from '../../config/paths.js';

export default function Wishlist() {
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
                {wishlist.length == 0 && (
                    <p className="mx-3 fs-5">
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

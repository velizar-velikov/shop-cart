import { Container, Row } from 'react-bootstrap';
import WishlistItem from './wishlist-item/WishlistItem.jsx';
import { useWishlistContext } from '../../contexts/WishlistContext.jsx';

import styles from './wishlist.module.css';

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
                <Row className=" d-flex flex-wrap w-100 row-cols-2 row-cols-sm-2 row-cols-md-4 row-cols-lg-4 g-1 g-sm-2 g-xl-3 m-auto">
                    {wishlist.map((product) => (
                        <WishlistItem key={product._id} {...product} />
                    ))}
                </Row>
            </Container>
        </Container>
    );
}

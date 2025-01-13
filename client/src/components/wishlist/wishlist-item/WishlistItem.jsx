import { Card, CardBody, CardTitle } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useWishlist } from '../../../hooks/custom/useWishlist.js';

import styles from './wishlistItem.module.css';

export default function WishlistItem({ _id, imageUrl, category, name, price }) {
    const { iconClassName, removeFromWishlist } = useWishlist({ _id, imageUrl, category, name, price });

    return (
        <div className={styles.container}>
            <button className={styles.icon} onClick={removeFromWishlist}>
                <i className={iconClassName.filled}></i>
            </button>
            <Link className="text-decoration-none">
                <Card className={styles.card}>
                    <img src={imageUrl} alt={category} className={`${styles['card-img-top']}`} />
                    <CardBody className={styles.body}>
                        <CardTitle className={styles.title}>{name}</CardTitle>
                        <p className={styles.price}>{`$${price}`}</p>
                    </CardBody>
                </Card>
            </Link>
        </div>
    );
}

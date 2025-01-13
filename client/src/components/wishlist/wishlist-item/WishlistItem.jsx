import { Card, CardBody, CardTitle } from 'react-bootstrap';

import styles from './wishlistItem.module.css';
import { Link } from 'react-router-dom';

const iconClassName = {
    empty: 'fa-regular fa-heart fa-lg',
    filled: 'fa-solid fa-heart fa-lg',
};

export default function WishlistItem({ imageUrl, category, name, price }) {
    const addToWishlist = (e) => {
        e.stopPropagation();
        e.preventDefault();
    };

    return (
        <div className={styles.container}>
            <button className={styles.icon} onClick={addToWishlist}>
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

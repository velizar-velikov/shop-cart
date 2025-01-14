import { Card, CardBody, CardTitle } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useWishlist } from '../../../hooks/custom/useWishlist.js';

import styles from './wishlistItem.module.css';
import paths from '../../../config/paths.js';
import { useRef } from 'react';

export default function WishlistItem({ _id, imageUrl, category, name, price }) {
    const { iconClassName, removeFromWishlist } = useWishlist({ _id, imageUrl, category, name, price });

    return (
        <div>
            <div className={styles.container}>
                <button className={styles.icon} onClick={removeFromWishlist}>
                    <i className={iconClassName.filled}></i>
                </button>
                <Link className="text-decoration-none" to={paths.details.getHref(_id)}>
                    <Card className={styles.card}>
                        <img src={imageUrl} alt={category} className={`${styles['card-img-top']}`} />
                        <CardBody className={styles.body}>
                            <CardTitle className={styles.title}>{name}</CardTitle>
                            <p className={styles.price}>{`$${price}`}</p>
                            <div className={styles['add-wrapper']}>
                                <button className={styles.add}>Add to cart</button>
                            </div>
                        </CardBody>
                    </Card>
                </Link>
            </div>
        </div>
    );
}

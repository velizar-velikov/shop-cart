import { Link } from 'react-router-dom';
import styles from './orderItem.module.css';
import paths from '../../../../config/paths.js';

const sizes = {
    small: 'S',
    medium: 'M',
    large: 'L',
};

export default function OrderItem({ productId, size, quantity, priceOfPurchase, imageUrl, name }) {
    return (
        <Link className={styles.link} to={paths.details.getHref(productId)}>
            <article className={styles.card}>
                <div className={styles['img-wrapper']}>
                    <img className={styles.img} src={imageUrl} alt={name} />
                </div>
                <div className={styles.description}>
                    <div className="d-flex gap-3">
                        <p className={styles.p1}>Size: {sizes[size]}</p>
                        <p className={styles.p2}>Qty: {quantity}</p>
                    </div>
                    <p className={styles.p3}>{`$${priceOfPurchase}`}</p>
                </div>
            </article>
        </Link>
    );
}

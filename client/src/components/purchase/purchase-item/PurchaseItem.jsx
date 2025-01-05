import styles from './purchaseItem.module.css';

const sizes = {
    small: 'S',
    medium: 'M',
    large: 'L',
};

export default function PurchaseItem({ size, quantity, productInfo }) {
    return (
        <article className={styles.card}>
            <div className={styles['img-wrapper']}>
                <img className={styles.img} src={productInfo.imageUrl} alt={productInfo.name} />
            </div>
            <div className={styles.description}>
                <div className="d-flex gap-3">
                    <p className={styles.p1}>Size: {sizes[size]}</p>
                    <p className={styles.p2}>Qty: {quantity}</p>
                </div>
                <p className={styles.p3}>{`$${productInfo.price}`}</p>
            </div>
        </article>
    );
}

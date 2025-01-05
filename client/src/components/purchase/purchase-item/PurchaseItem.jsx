import styles from './purchaseItem.module.css';

export default function PurchaseItem() {
    return (
        <article className={styles.card}>
            <div className={styles['img-wrapper']}>
                <img
                    className={styles.img}
                    src="https://assets.myntassets.com/dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/26028706/2023/12/4/9a8020ac-daa8-4274-97a8-2bdd07d6589c1701681057551SlyckOffWhiteFloralPrintTop1.jpg"
                    alt="clothing"
                />
            </div>
            <div className={styles.description}>
                <p className={styles.p1}>Size: M</p>
                <p className={styles.p2}>$29</p>
            </div>
        </article>
    );
}

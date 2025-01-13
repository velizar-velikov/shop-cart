import { Card, CardBody, CardTitle, CardText, Container } from 'react-bootstrap';

import styles from './wishlistItem.module.css';
import { Link } from 'react-router-dom';

export default function WishlistItem({ imageUrl, category, name, price }) {
    return (
        <div>
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

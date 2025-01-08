import { Card, CardBody, CardTitle, CardText } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './catalogCard.module.css';
import paths from '../../config/paths.js';
import { useState } from 'react';

const sizesReference = {
    small: 'S',
    medium: 'M',
    large: 'L',
};

export default function CatalogCard({ _id, name, category, price, summary, imageUrl, sizes, isHome = false }) {
    if (!sizes) {
        sizes = {};
    }

    const sizesText = Object.entries(sizes)
        .filter(([size, quantity]) => quantity > 0)
        .map(([size, quantity]) => `${sizesReference[size]}`)
        .join(', ');

    const [text, setText] = useState(summary);

    const showSizes = () => {
        setText(Object.values(sizes).some((q) => q > 0) ? `Available sizes: ${sizesText}` : 'Out of stock');
    };

    const showSummary = () => {
        setText(summary);
    };

    return (
        <div>
            <Link to={paths.details.getHref(_id)} className="text-decoration-none">
                <Card onMouseEnter={showSizes} onMouseLeave={showSummary} className={styles.card}>
                    <img src={imageUrl} alt={category} className={`card-img-catalog ${styles['card-img-top']}`} />
                    <CardBody className={styles.body}>
                        <CardTitle className={styles.title}>{name}</CardTitle>
                        <CardText className={styles.text}>{!isHome ? text : summary}</CardText>
                        <p className={styles.price}>{`$${price}`}</p>
                    </CardBody>
                </Card>
            </Link>
        </div>
    );
}

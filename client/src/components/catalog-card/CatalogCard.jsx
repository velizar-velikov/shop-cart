import { Card, CardBody, CardTitle, CardText } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './catalogCard.module.css';
import paths from '../../config/paths.js';

export default function CatalogCard({ _id, name, category, summary, imageUrl }) {
    return (
        <div>
            <Link to={paths.details.getHref(_id)} className="text-decoration-none">
                <Card className={styles.card}>
                    <img src={imageUrl} alt={category} className={`card-img-catalog ${styles['card-img-top']}`} />
                    <CardBody className={styles.body}>
                        <CardTitle className={styles.title}>{name}</CardTitle>
                        <CardText className={styles.text}>{summary}</CardText>
                        <p>$49</p>
                    </CardBody>
                </Card>
            </Link>
        </div>
    );
}

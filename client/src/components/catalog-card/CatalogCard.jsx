import { Card, CardBody, CardTitle, CardText } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './catalogCard.module.css';
import paths from '../../config/paths.js';

export default function CatalogCard({ _id, name, category, summary, imageUrl }) {
    return (
        <div>
            <Link to={paths.details.getHref(_id)} className="text-decoration-none">
                <Card>
                    <img src={imageUrl} alt={category} className={styles['card-img-top']} />
                    <CardBody>
                        <CardTitle>{name}</CardTitle>
                        <CardText>{summary}</CardText>
                    </CardBody>
                </Card>
            </Link>
        </div>
    );
}

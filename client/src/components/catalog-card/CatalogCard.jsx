import { Card, CardBody, CardTitle, CardText } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './catalogCard.module.css';
import paths from '../../config/paths.js';

export default function CatalogCard({ _id, name, category, summary, imageUrl }) {
    return (
        <div>
            <Card>
                <img src={imageUrl} alt={category} className={styles['card-img-top']} />
                <CardBody>
                    <CardTitle>{name}</CardTitle>
                    <CardText>{summary}</CardText>
                    <Link to={paths.details.getHref(_id)} className="btn btn-dark">
                        Details
                    </Link>
                </CardBody>
            </Card>
        </div>
    );
}

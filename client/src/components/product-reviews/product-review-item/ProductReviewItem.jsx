import Accordion from 'react-bootstrap/Accordion';
import RatingStars from '../../rating-stars/RatingStars.jsx';

export default function ProductReviewItem({ index, text, rating, reviewerFullName }) {
    return (
        <Accordion.Item eventKey={index.toString()}>
            <Accordion.Header>
                <div className="rating d-flex gap-3">
                    <RatingStars rating={rating} />
                    <p>{reviewerFullName}</p>
                </div>
            </Accordion.Header>
            <Accordion.Body>{text}</Accordion.Body>
        </Accordion.Item>
    );
}

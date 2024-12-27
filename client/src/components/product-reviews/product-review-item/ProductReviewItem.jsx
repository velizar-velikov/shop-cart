import Accordion from 'react-bootstrap/Accordion';
import RatingStars from '../../rating-stars/RatingStars.jsx';
import { useState } from 'react';
import { Button } from 'react-bootstrap';

export default function ProductReviewItem({ index, text, rating, reviewerFullName }) {
    const [textState, setTextState] = useState(text);
    const editHandler = (e) => {
        e.stopPropagation();
        console.log('editing');
    };

    const deleteHandler = (e) => {
        e.stopPropagation();
        console.log('deleting');
    };
    return (
        <Accordion.Item eventKey={index.toString()}>
            <Accordion.Header>
                <div className="d-flex justify-content-between col-10">
                    <div className="rating d-flex gap-3">
                        <RatingStars rating={rating} />
                        <p>{reviewerFullName}</p>
                    </div>
                    <div className="buttons d-flex gap-1">
                        <Button className="border btn-light rounded px-2 py-1 shadow" onClick={editHandler}>
                            Edit
                        </Button>
                        <Button className="border btn-light rounded px-2 py-1 shadow" onClick={deleteHandler}>
                            Delete
                        </Button>
                    </div>
                </div>
            </Accordion.Header>
            <Accordion.Body>{text}</Accordion.Body>
        </Accordion.Item>
    );
}

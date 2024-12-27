import Accordion from 'react-bootstrap/Accordion';
import RatingStars from '../../rating-stars/RatingStars.jsx';
import { useState } from 'react';
import ReviewControlButtons from './review-control-buttons/ReviewControlButtons.jsx';
import { useAuthContext } from '../../../contexts/AuthContext.jsx';
import EditReviewForm from './edit-review-form/EditReviewForm.jsx';

export default function ProductReviewItem({ index, text, rating, reviewerFullName, _ownerId }) {
    const [textState, setTextState] = useState({ text: text });
    const [isEditing, setIsEditing] = useState(false);
    const { userId } = useAuthContext();
    const isOwnerOfReview = userId == _ownerId;

    return (
        <Accordion.Item eventKey={index.toString()}>
            <Accordion.Header>
                <div className="d-flex justify-content-between col-10">
                    <div className="rating d-flex gap-3">
                        <RatingStars rating={rating} />
                        <p>{reviewerFullName}</p>
                    </div>

                    {isOwnerOfReview && <ReviewControlButtons setIsEditing={setIsEditing} />}
                </div>
            </Accordion.Header>
            <Accordion.Body>
                {isEditing ? (
                    <EditReviewForm textState={textState} setTextState={setTextState} setIsEditing={setIsEditing} />
                ) : (
                    <p>{textState.text}</p>
                )}
            </Accordion.Body>
        </Accordion.Item>
    );
}

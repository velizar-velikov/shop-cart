import Accordion from 'react-bootstrap/Accordion';
import RatingStars from '../../rating-stars/RatingStars.jsx';
import EditReviewForm from './edit-review-form/EditReviewForm.jsx';
import ReviewControlButtons from './review-control-buttons/ReviewControlButtons.jsx';

import { useState } from 'react';
import { useAuthContext } from '../../../contexts/AuthContext.tsx';

export default function ProductReviewItem({ index, setReviews, text, rating, reviewerFullName, _id: reviewId, _ownerId }) {
    const [textState, setTextState] = useState({ text: text });
    const [isEditing, setIsEditing] = useState(false);
    const { userId } = useAuthContext();
    const isOwnerOfReview = userId == _ownerId;

    return (
        <Accordion.Item eventKey={index.toString()}>
            <Accordion.Header>
                <div className="d-flex flex-wrap justify-content-between col-10">
                    <div className="rating d-flex flex-wrap gap-3">
                        <RatingStars rating={rating} />
                        <p>{reviewerFullName}</p>
                    </div>

                    {isOwnerOfReview && (
                        <ReviewControlButtons reviewId={reviewId} setReviews={setReviews} setIsEditing={setIsEditing} />
                    )}
                </div>
            </Accordion.Header>
            <Accordion.Body>
                {isEditing ? (
                    <EditReviewForm
                        reviewId={reviewId}
                        textState={textState}
                        setTextState={setTextState}
                        setIsEditing={setIsEditing}
                    />
                ) : (
                    <p>{textState.text}</p>
                )}
            </Accordion.Body>
        </Accordion.Item>
    );
}

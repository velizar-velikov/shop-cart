import Accordion from 'react-bootstrap/Accordion';
import RatingStars from '../../rating-stars/RatingStars.tsx';
import EditReviewForm from './edit-review-form/EditReviewForm.tsx';
import ReviewControlButtons from './review-control-buttons/ReviewControlButtons.tsx';

import { Dispatch, SetStateAction, useState } from 'react';
import { useAuthContext } from '../../../contexts/AuthContext.tsx';
import { ReviewResponse } from '../../../types/review.ts';

interface ProductReviewItemProps {
    index: number;
    setReviews: Dispatch<SetStateAction<ReviewResponse[]>>;
    text: string;
    rating: string;
    reviewerFullName: string;
    _id: string;
    _ownerId: string;
}

export default function ProductReviewItem({
    index,
    setReviews,
    text,
    rating,
    reviewerFullName,
    _id: reviewId,
    _ownerId,
}: ProductReviewItemProps) {
    const [textState, setTextState] = useState({ text: text });
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const { userId } = useAuthContext();
    const isOwnerOfReview: boolean = userId == _ownerId;

    return (
        <Accordion.Item eventKey={index.toString()}>
            <Accordion.Header>
                <div className="d-flex flex-wrap justify-content-between col-10">
                    <div className="rating d-flex flex-wrap gap-3">
                        <RatingStars rating={Number(rating)} />
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

import { Button } from 'react-bootstrap';
import { useDeleteReviewForProduct } from '../../../../hooks/custom/useReviews.ts';
import { Dispatch, SetStateAction } from 'react';
import { ReviewResponse } from '../../../../types/review.ts';

interface ReviewControlButtonsProps {
    reviewId: string;
    setReviews: Dispatch<SetStateAction<ReviewResponse[]>>;
    setIsEditing: Dispatch<SetStateAction<boolean>>;
}

export default function ReviewControlButtons({ reviewId, setReviews, setIsEditing }: ReviewControlButtonsProps) {
    const deleteReview = useDeleteReviewForProduct();

    const editHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setIsEditing(true);
    };

    const deleteHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();

        try {
            await deleteReview(reviewId);
            setReviews((currentReviews) => {
                const index = currentReviews.findIndex((review) => review._id == reviewId);
                return currentReviews.toSpliced(index, 1);
            });
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            }
        }
    };

    return (
        <div className="buttons d-flex gap-1">
            <Button className="border btn-light rounded px-2 py-1 shadow" onClick={editHandler}>
                Edit
            </Button>
            <Button className="border btn-light rounded px-2 py-1 shadow" onClick={deleteHandler}>
                Delete
            </Button>
        </div>
    );
}

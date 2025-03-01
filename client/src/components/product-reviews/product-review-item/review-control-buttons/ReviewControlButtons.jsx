import { Button } from 'react-bootstrap';
import { useDeleteReviewForProduct } from '../../../../hooks/custom/useReviews.ts';

export default function ReviewControlButtons({ reviewId, setReviews, setIsEditing }) {
    const deleteReview = useDeleteReviewForProduct();

    const editHandler = (e) => {
        e.stopPropagation();
        setIsEditing(true);
    };

    const deleteHandler = async (e) => {
        e.stopPropagation();

        try {
            await deleteReview(reviewId);
            setReviews((currentReviews) => {
                const index = currentReviews.findIndex((review) => review._id == reviewId);
                return currentReviews.toSpliced(index, 1);
            });
        } catch (error) {
            console.log(error.message);
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

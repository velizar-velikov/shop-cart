import { Button, Container } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import { Link, useParams } from 'react-router-dom';

import ProductReviewItem from './product-review-item/ProductReviewItem.jsx';
import LoadingSpinner from '../loading-spinner/LoadingSpinner.jsx';

import { useAGetAllReviewsForProduct } from '../../hooks/custom/useReviews.ts';
import { useGetOneProduct } from '../../hooks/custom/useProducts.js';
import { useAuthContext } from '../../contexts/AuthContext.tsx';

import paths from '../../config/paths.ts';

export default function ProductReviews() {
    const { productId } = useParams();
    const { userId } = useAuthContext();
    const { product, isLoading: isLoadingProduct } = useGetOneProduct(productId);
    const { reviews, setReviews, isLoading: isLoadingReviews } = useAGetAllReviewsForProduct(productId, userId);

    return (
        <>
            {isLoadingProduct || isLoadingReviews ? (
                <LoadingSpinner />
            ) : (
                <Container className="container-sm col-11 col-xs-10 col-sm-9 col-md-8 col-lg-6 mt-5 mb-4 p-4 p-lg-5 bg-dark-subtle shadow rounded-3">
                    <div className="d-flex flex-wrap mb-3 gap-5">
                        <Button as={Link} to={paths.details.getHref(productId)} className="col-3 col-xs-3 col-sm-2 col-lg-2 h-50">
                            Back
                        </Button>
                        <h3 className="text-center d-flex flex-wrap justify-content-center align-items-center gap-2">
                            <span>{product.name}</span>
                            <span className="h6 text-secondary">{product.brand}</span>
                            <span className="ms-3">reviews</span>
                        </h3>
                    </div>
                    {reviews.length == 0 ? (
                        <p className="text-center">There are no reviews for this product yet. Be the first to rate it!</p>
                    ) : (
                        <Accordion defaultActiveKey="0">
                            {reviews.map((review, index) => (
                                <ProductReviewItem key={review._id} index={index} setReviews={setReviews} {...review} />
                            ))}
                        </Accordion>
                    )}
                </Container>
            )}
        </>
    );
}

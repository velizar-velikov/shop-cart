import { Button, Container } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import { Link, useParams } from 'react-router-dom';
import ProductReviewItem from './product-review-item/ProductReviewItem.jsx';

const arr = [1, 2, 3, 4];

export default function ProductReviews() {
    const { productId } = useParams();
    return (
        <Container className="container-sm col-8 col-md-7 col-lg-6 mt-5 p-4 p-lg-5 bg-dark-subtle shadow rounded-3">
            <div className="d-flex mb-3 gap-5">
                <Button as={Link} to={`/catalog/${productId}/details`} className="col-2 h-50">
                    Back
                </Button>
                <h3 className="text-center d-flex flex-wrap justify-content-center align-items-center gap-2">
                    <span>Sports t-shirt</span>
                    <span className="h6 text-secondary">Nike</span>
                    <span className="ms-3">reviews</span>
                </h3>
            </div>
            {arr.length == 0 ? (
                <p className="text-center">There are no reviews for this product yet. Be the first to rate it!</p>
            ) : (
                <Accordion defaultActiveKey="0">
                    {arr.map((item, index) => (
                        <ProductReviewItem key={item} index={index} />
                    ))}
                </Accordion>
            )}
        </Container>
    );
}

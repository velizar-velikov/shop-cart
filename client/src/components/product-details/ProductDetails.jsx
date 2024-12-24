import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CreateReviewModal from '../create-review-modal/CreateReviewModal.jsx';
import AddStockModal from '../add-stock-modal/AddStockModal.jsx';
import DeleteProductModal from '../delete-product-modal/DeleteProductModal.jsx';
import { useGetOneProduct } from '../../hooks/useProducts.js';
import { useAuthContext } from '../../contexts/AuthContext.jsx';
import ActionButtons from './action-buttons/ActionButtons.jsx';
import LoadingSpinner from '../loading-spinner/LoadingSpinner.jsx';

export default function ProductDetails() {
    const { productId } = useParams();

    const { product, isLoading } = useGetOneProduct(productId);

    const [showAddReviewModal, setShowAddReviewModal] = useState(false);
    const [showAddStockModal, setShowAddStockModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleShowAddReview = () => setShowAddReviewModal(true);
    const handleCloseAddReview = () => setShowAddReviewModal(false);

    const handleShowAddStock = () => setShowAddStockModal(true);
    const handleCloseAddStock = () => setShowAddStockModal(false);

    const handleShowDelete = () => setShowDeleteModal(true);
    const handleCloseDelete = () => setShowDeleteModal(false);

    const { isAuthenticated } = useAuthContext();

    return (
        <>
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <div className="mx-4 mx-md-0 mx-lg-0">
                    {showAddReviewModal && <CreateReviewModal show={handleShowAddReview} handleClose={handleCloseAddReview} />}
                    {showAddStockModal && <AddStockModal show={handleShowAddStock} handleClose={handleCloseAddStock} />}
                    {showDeleteModal && (
                        <DeleteProductModal show={handleShowDelete} handleClose={handleCloseDelete} {...product} />
                    )}

                    <Container className="container-sm col-12 col-md-10 col-lg-7 mt-3 mb-3 p-4 bg-dark-subtle shadow rounded-3">
                        <Row className="d-flex flex-column flex-sm-row flex-md-row flex-lg-row">
                            <Col className="d-flex justify-content-center align-items-center">
                                <img className="card-img" src={product.imageUrl} />
                            </Col>
                            <Col className="d-flex align-items-center">
                                <div className="d-flex flex-column justify-content-between">
                                    <h6 className="text-secondary">{product.brand}</h6>
                                    <h1>{product.name}</h1>
                                    <div className="d-flex gap-3">
                                        <div className="rating">
                                            <div className="stars">
                                                <i className="fa fa-star text-warning"></i>
                                                <i className="fa fa-star text-warning"></i>
                                                <i className="fa fa-star text-warning"></i>
                                                <i className="fa fa-star text-warning"></i>
                                            </div>
                                            <p className="small fst-italic">
                                                4.1/ <Link to={`/catalog/${product._id}/reviews`}>104 reviews</Link>
                                            </p>
                                        </div>
                                        <Link onClick={handleShowAddReview}>Add review</Link>
                                    </div>
                                    <p className="small">{product.description}</p>
                                    <p className="h4 font-weight-bold">
                                        {'$ '}
                                        {product.price}
                                    </p>
                                    {/* show when out of stock from all sizes */}
                                    <p className="text-danger">Out of stock</p>

                                    {isAuthenticated && (
                                        <ActionButtons
                                            product={product}
                                            handleShowAddStock={handleShowAddStock}
                                            handleShowDelete={handleShowDelete}
                                        />
                                    )}
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            )}
        </>
    );
}

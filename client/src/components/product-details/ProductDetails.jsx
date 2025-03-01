import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Link, useParams } from 'react-router-dom';

import CreateReviewModal from '../create-review-modal/CreateReviewModal.jsx';
import AddStockModal from '../add-stock-modal/AddStockModal.jsx';
import DeleteProductModal from '../delete-product-modal/DeleteProductModal.jsx';
import ActionButtons from './action-buttons/ActionButtons.jsx';
import LoadingSpinner from '../loading-spinner/LoadingSpinner.jsx';
import RatingStars from '../rating-stars/RatingStars.jsx';

import { useState } from 'react';
import { useGetOneProduct } from '../../hooks/custom/useProducts.js';
import { useGetRatingInfo, useGetUserReviewsForProduct } from '../../hooks/custom/useReviews.ts';
import { useGetSizesForProduct } from '../../hooks/custom/useStock.ts';
import { useAuthContext } from '../../contexts/AuthContext.tsx';

import styles from './productDetails.module.css';
import paths from '../../config/paths.ts';

export default function ProductDetails() {
    const { productId } = useParams();
    const { userId, isAuthenticated } = useAuthContext();

    const [hasAddedNewReview, setHasAddedNewReview] = useState(false);

    const { product, isLoading: isProductLoading } = useGetOneProduct(productId);
    const { averageRating, ratingsCount, isLoading: isRatingInfoLoading } = useGetRatingInfo(productId, hasAddedNewReview);

    const { sizes, setSizes } = useGetSizesForProduct(productId);
    const isOutOfStock = Object.entries(sizes).every(([key, value]) => value == 0);

    const isOwner = userId == product._ownerId;

    // only make request to see if the user has left a review if the user is authenticated
    const { hasUserReviewed, isLoading: isUserReviewsLoading } = !isAuthenticated
        ? { hasUserReviewed: false, isLoading: false }
        : useGetUserReviewsForProduct(productId, userId, hasAddedNewReview);

    const canUserReview = isAuthenticated && !isOwner && !hasUserReviewed;

    const [showAddReviewModal, setShowAddReviewModal] = useState(false);
    const [showAddStockModal, setShowAddStockModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleShowAddReview = () => setShowAddReviewModal(true);
    const handleCloseAddReview = () => setShowAddReviewModal(false);

    const handleShowAddStock = () => setShowAddStockModal(true);
    const handleCloseAddStock = () => setShowAddStockModal(false);

    const handleShowDelete = () => setShowDeleteModal(true);
    const handleCloseDelete = () => setShowDeleteModal(false);

    const isPageLoading = isProductLoading || isRatingInfoLoading || isUserReviewsLoading;

    return (
        <>
            {isPageLoading ? (
                <LoadingSpinner />
            ) : (
                <div className="mx-4 mx-md-0 mx-lg-0">
                    {showAddReviewModal && (
                        <CreateReviewModal
                            show={handleShowAddReview}
                            handleClose={handleCloseAddReview}
                            updateDetails={() => setHasAddedNewReview(true)}
                            productName={product.name}
                        />
                    )}
                    {showAddStockModal && (
                        <AddStockModal
                            show={handleShowAddStock}
                            handleClose={handleCloseAddStock}
                            product={product}
                            sizes={sizes}
                            updateSizes={setSizes}
                        />
                    )}
                    {showDeleteModal && (
                        <DeleteProductModal show={handleShowDelete} handleClose={handleCloseDelete} {...product} />
                    )}

                    <Container
                        className={`container-sm col-12 col-md-9 col-lg-8 col-xl-7 mt-3 mb-3 rounded-3 ${styles.container}`}
                    >
                        <Row className="d-flex flex-column flex-sm-row flex-md-row flex-lg-row">
                            <Col className={styles['img-wrapper']}>
                                <img className={styles['card-img']} src={product.imageUrl} />
                            </Col>
                            <Col className="d-flex align-items-center px-3 px-md-4 py-3">
                                <div className="d-flex flex-column justify-content-between">
                                    <h6 className="text-secondary">{product.brand}</h6>
                                    <h2 className="pb-1">{product.name}</h2>
                                    <div className="d-flex">
                                        <div className="rating col-5">
                                            <RatingStars rating={averageRating} />

                                            <p className="small fst-italic">
                                                {averageRating.toFixed(1)}/{' '}
                                                <Link to={paths.reviews.getHref(product._id)}>{ratingsCount} reviews</Link>
                                            </p>
                                        </div>

                                        {canUserReview && <Link onClick={handleShowAddReview}>Add review</Link>}
                                        {hasUserReviewed && <p className="small col-7">You reviewed this product.</p>}
                                    </div>
                                    <p className="small">{product.description}</p>
                                    <p className="h4 font-weight-bold">
                                        {'$ '}
                                        {product.price}
                                    </p>
                                    {/* show when out of stock from all sizes */}
                                    {isOutOfStock && <p className="text-danger">Out of stock</p>}

                                    {isAuthenticated && (
                                        <ActionButtons
                                            product={product}
                                            inStockSizes={sizes}
                                            setInStockSizes={setSizes}
                                            isOutOfStock={isOutOfStock}
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

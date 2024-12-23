import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CreateReview from '../create-review/CreateReview.jsx';
import AddStock from '../add-stock/AddStock.jsx';
import DeleteProduct from '../delete-product/DeleteProduct.jsx';
import { useGetOneProduct } from '../../hooks/useProducts.js';
import { useAuthContext } from '../../contexts/AuthContext.jsx';
import ActionButtons from './action-buttons/ActionButtons.jsx';
import LoadingSpinner from '../loading-spinner/LoadingSpinner.jsx';

export default function ProductDetails() {
    const { productId } = useParams();

    const { product, isLoading } = useGetOneProduct(productId);

    const [showAddReview, setShowAddReview] = useState(false);
    const [showAddStock, setShowAddStock] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const handleShowAddReview = () => setShowAddReview(true);
    const handleCloseAddReview = () => setShowAddReview(false);

    const handleShowAddStock = () => setShowAddStock(true);
    const handleCloseAddStock = () => setShowAddStock(false);

    const handleShowDelete = () => setShowDelete(true);
    const handleCloseDelete = () => setShowDelete(false);

    const { isAuthenticated } = useAuthContext();

    return (
        <>
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <div className="mx-4 mx-md-0 mx-lg-0">
                    {showAddReview && <CreateReview show={handleShowAddReview} handleClose={handleCloseAddReview} />}
                    {showAddStock && <AddStock show={handleShowAddStock} handleClose={handleCloseAddStock} />}
                    {showDelete && <DeleteProduct show={handleShowDelete} handleClose={handleCloseDelete} />}

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
                                            showAddStock={showAddStock}
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

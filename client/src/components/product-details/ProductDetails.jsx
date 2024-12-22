import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import CreateReview from '../create-review/CreateReview.jsx';
import AddStock from '../add-stock/AddStock.jsx';
import DeleteProduct from '../delete-product/DeleteProduct.jsx';

export default function ProductDetails() {
    const [showAddReview, setShowAddReview] = useState(false);
    const [showAddStock, setShowAddStock] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const handleShowAddReview = () => setShowAddReview(true);
    const handleCloseAddReview = () => setShowAddReview(false);

    const handleShowAddStock = () => setShowAddStock(true);
    const handleCloseAddStock = () => setShowAddStock(false);

    const handleShowDelete = () => setShowDelete(true);
    const handleCloseDelete = () => setShowDelete(false);

    return (
        <div className="mx-4 mx-md-0 mx-lg-0">
            {showAddReview && <CreateReview show={handleShowAddReview} handleClose={handleCloseAddReview} />}
            {showAddStock && <AddStock show={handleShowAddStock} handleClose={handleCloseAddStock} />}
            {showDelete && <DeleteProduct show={handleShowDelete} handleClose={handleCloseDelete} />}

            <Container className="container-sm col-12 col-md-10 col-lg-7 mt-5 p-4 p-lg-5 bg-dark-subtle shadow rounded-3">
                <Row className="d-flex flex-column flex-sm-row flex-md-row flex-lg-row">
                    <Col className="d-flex justify-content-center align-items-center">
                        <img
                            className="card-img"
                            src="https://www.tennis-point.co.uk/dw/image/v2/BBDP_PRD/on/demandware.static/-/Sites-master-catalog/default/dwf9d22348/images/004/454/52032000_000.jpg?q=80&sw=2000"
                        />
                    </Col>
                    <Col className="d-flex align-items-center">
                        <div className="d-flex flex-column justify-content-between">
                            <h6 className="text-secondary">Nike</h6>
                            <h1>Sports t-shirt</h1>
                            <div className="d-flex gap-3">
                                <div className="rating">
                                    <div className="stars">
                                        <i className="fa fa-star text-warning"></i>
                                        <i className="fa fa-star text-warning"></i>
                                        <i className="fa fa-star text-warning"></i>
                                        <i className="fa fa-star text-warning"></i>
                                    </div>
                                    <p className="small fst-italic">
                                        4.1/ <Link to="/catalog/:id/reviews">104 reviews</Link>
                                    </p>
                                </div>
                                <Link onClick={handleShowAddReview}>Add review</Link>
                            </div>
                            <p className="small">
                                This t-shirt is from all natural cotton material, which will help your body breathe that much
                                better during exercise!
                            </p>
                            <p className="h4 font-weight-bold">$39</p>
                            {/* show when out of stock from all sizes */}
                            <p className="text-danger">Out of stock</p>

                            {/* for users that are not owners */}
                            {/* <Form>
                                <div className="d-flex gap-3">
                                    <Form.Group className="col-4">
                                        <Form.Label>Amount</Form.Label>
                                        <Form.Control type="number" defaultValue="1"></Form.Control>
                                    </Form.Group>
                                    <Form.Group className="col-4 mt-1">
                                        <Form.Label>Size</Form.Label>
                                        <Form.Select size="sm">
                                            <option>Small</option>
                                            <option>Medium</option>
                                            <option>Large</option>
                                        </Form.Select>
                                    </Form.Group>
                                </div>
                                <Button className="col-6 mt-4 m-sm-2 m-lg-4">Add to cart</Button>
                            </Form> */}

                            {/* for owner */}
                            <Row className="d-flex align-items-center">
                                <Col sm={5}>
                                    <Button as={Link} onClick={handleShowAddStock} className="btn-dark mb-1">
                                        Add in stock
                                    </Button>
                                </Col>
                                <Col sm={2} className="">
                                    <Button className="mb-1">Edit</Button>
                                </Col>
                                <Col sm={3}>
                                    <Button as={Link} onClick={handleShowDelete} className="btn-danger mb-1">
                                        Delete
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

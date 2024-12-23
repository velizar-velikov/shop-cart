import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../../contexts/AuthContext.jsx';

export default function ActionButtons({ product, handleShowAddStock, handleShowDelete }) {
    const { userId } = useAuthContext();
    const isOwner = userId == product._ownerId;
    console.log({ isOwner });

    return (
        <>
            {isOwner ? (
                <Row className="d-flex align-items-center">
                    <Col sm={5}>
                        <Button as={Link} onClick={handleShowAddStock} className="btn-dark mb-1">
                            Add in stock
                        </Button>
                    </Col>
                    <Col sm={2} className="">
                        <Button as={Link} to={`/catalog/${product._id}/edit`} className="mb-1">
                            Edit
                        </Button>
                    </Col>
                    <Col sm={3}>
                        <Button as={Link} onClick={handleShowDelete} className="btn-danger mb-1">
                            Delete
                        </Button>
                    </Col>
                </Row>
            ) : (
                <Form>
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
                </Form>
            )}
        </>
    );
}

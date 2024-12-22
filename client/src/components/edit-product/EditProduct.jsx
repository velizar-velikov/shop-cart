import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Col, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

export default function EditProduct() {
    const { productId } = useParams();

    return (
        <Container className="container-sm col-8 col-md-7 col-lg-5 mt-5 mb-4 p-4 p-lg-5 bg-dark-subtle shadow rounded-3">
            <Form>
                <Link to={`/catalog/${productId}/details`}>
                    <i className="fa-solid fa-arrow-left fa-lg mb-3 text-dark"></i>
                </Link>
                <h2>Edit product</h2>

                <Row className="d-flex">
                    <Col>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Short sleeve t-shirt" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Brand</Form.Label>
                            <Form.Control type="text" placeholder="Nike" />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="d-flex align-items-center">
                    <Col>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Category</Form.Label>
                            <Form.Select size="sm">
                                <option>T-shirts</option>
                                <option>Shorts</option>
                                <option>Sweatshirts</option>
                                <option>Pants</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" min="0" />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control type="text" placeholder="https://..." />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                    <Form.Label>Summary (up to 40 characters)</Form.Label>
                    <Form.Control type="text" placeholder="comfortable cotton t-shirt" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                    <Form.Label>Full description</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Great for summer and spring and also..." />
                </Form.Group>
                <Button variant="btn btn-dark mt-3 btn-outline-tertiary" type="submit">
                    Save
                </Button>
            </Form>
        </Container>
    );
}

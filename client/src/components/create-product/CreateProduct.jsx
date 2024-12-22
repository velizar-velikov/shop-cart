import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Col, Row } from 'react-bootstrap';

export default function CreateProduct() {
    return (
        <Container className="container-sm col-8 col-md-7 col-lg-5 mt-5 mb-4 p-4 p-lg-5 bg-dark-subtle shadow rounded-3">
            <Form>
                <h2>Add product</h2>

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
                <p className="small">
                    <span className="d-inline-block mr-3">Note:</span>
                    <span className="d-inline-block">
                        Product will be added with stock of 1 from each size ( S, M, L ). If you want to add in stock you will be
                        able to do it from product description after you have created the product.
                    </span>
                </p>
                <Button variant="btn btn-dark mt-3 btn-outline-tertiary" type="submit">
                    Create
                </Button>
            </Form>
        </Container>
    );
}

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Col, Row } from 'react-bootstrap';
import { useForm } from '../../hooks/useForm.js';
import productsAPI from '../../api/products-api.js';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCreateProduct } from '../../hooks/useProducts.js';

const initialValues = {
    name: '',
    brand: '',
    category: 'T-shirts',
    price: 0,
    imageUrl: '',
    summary: '',
    description: '',
};

export default function CreateProduct() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    const createProduct = useCreateProduct();

    const createHandler = async (values) => {
        const sanitizedValues = Object.fromEntries(Object.entries(values).map(([key, value]) => [key, value.toString().trim()]));

        try {
            const hasEmptyField = Object.values(sanitizedValues).some((value) => !value);

            if (hasEmptyField) {
                throw new Error('All fields are required.');
            }

            const product = await createProduct(values);
            navigate(`/catalog/${product._id}/details`);
        } catch (error) {
            console.log(error.message);
            setErrorMessage(error.message);
        }
    };

    const { values, changeHandler, submitHandler } = useForm(initialValues, createHandler);

    return (
        <Container className="container-sm col-8 col-md-7 col-lg-5 mt-5 mb-4 p-4 p-lg-5 bg-dark-subtle shadow rounded-3">
            <Form onSubmit={submitHandler}>
                <h2>Add product</h2>

                <Row className="d-flex">
                    <Col>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                value={values.name}
                                onChange={changeHandler}
                                name="name"
                                type="text"
                                placeholder="Short sleeve t-shirt"
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Brand</Form.Label>
                            <Form.Control
                                value={values.brand}
                                onChange={changeHandler}
                                name="brand"
                                type="text"
                                placeholder="Nike"
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="d-flex align-items-center">
                    <Col>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Category</Form.Label>
                            <Form.Select value={values.category} onChange={changeHandler} name="category" size="sm">
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
                            <Form.Control value={values.price} onChange={changeHandler} name="price" type="number" min="0" />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control
                        value={values.imageUrl}
                        onChange={changeHandler}
                        name="imageUrl"
                        type="text"
                        placeholder="https://..."
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                    <Form.Label>Summary (up to 40 characters)</Form.Label>
                    <Form.Control
                        value={values.summary}
                        onChange={changeHandler}
                        name="summary"
                        type="text"
                        placeholder="comfortable cotton t-shirt"
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                    <Form.Label>Full description</Form.Label>
                    <Form.Control
                        value={values.description}
                        onChange={changeHandler}
                        name="description"
                        as="textarea"
                        rows={3}
                        placeholder="Great for summer and spring and also..."
                    />
                </Form.Group>
                <p className="small">
                    <span className="d-inline-block mr-3">Note:</span>
                    <span className="d-inline-block">
                        Before publishing a product, you need to have at least 1 item of each size (S, M, L) in stock. Product
                        will be added with stock of 1 from each size ( S, M, L ). If you want to add more in stock, you will be
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

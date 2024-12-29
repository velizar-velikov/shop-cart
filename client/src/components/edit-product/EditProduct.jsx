import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Col, Row } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { useForm } from '../../hooks/useForm.js';
import { useState } from 'react';
import { useEditProduct, useGetOneProduct } from '../../hooks/useProducts.js';

import LoadingSpinner from '../loading-spinner/LoadingSpinner.jsx';
import paths from '../../config/paths.js';

export default function EditProduct() {
    const { productId } = useParams();
    const { product, isLoading } = useGetOneProduct(productId);
    const editProduct = useEditProduct();

    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const editHandler = async (values) => {
        const sanitizedValues = Object.fromEntries(Object.entries(values).map(([key, value]) => [key, value.toString().trim()]));

        try {
            const hasEmptyField = Object.values(sanitizedValues).some((value) => !value);

            if (hasEmptyField) {
                throw new Error('All fields are required.');
            }

            await editProduct(productId, values);
            navigate(paths.details.getHref(productId));
        } catch (error) {
            console.log(error.message);
            setErrorMessage(error.message);
        }
    };

    const { values, changeHandler, submitHandler } = useForm(product, editHandler);

    return (
        <>
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <Container className="container-sm col-8 col-md-7 col-lg-5 mt-5 mb-4 p-4 p-lg-5 bg-dark-subtle shadow rounded-3">
                    <Form onSubmit={submitHandler}>
                        <Link to={paths.details.getHref(productId)}>
                            <i className="fa-solid fa-arrow-left fa-lg mb-3 text-dark"></i>
                        </Link>
                        <h2>Edit product</h2>

                        <Row className="d-flex">
                            <Col>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        placeholder="Short sleeve t-shirt"
                                        value={values.name}
                                        onChange={changeHandler}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Brand</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="brand"
                                        placeholder="Nike"
                                        value={values.brand}
                                        onChange={changeHandler}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="d-flex align-items-center">
                            <Col>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Select size="sm" name="category" value={values.category} onChange={changeHandler}>
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
                                    <Form.Control
                                        type="number"
                                        min="0.01"
                                        step="0.01"
                                        name="price"
                                        value={values.price}
                                        onChange={changeHandler}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control
                                type="text"
                                name="imageUrl"
                                placeholder="https://..."
                                value={values.imageUrl}
                                onChange={changeHandler}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Summary (up to 40 characters)</Form.Label>
                            <Form.Control
                                type="text"
                                name="summary"
                                placeholder="comfortable cotton t-shirt"
                                value={values.summary}
                                onChange={changeHandler}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                            <Form.Label>Full description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="description"
                                placeholder="Great for summer and spring and also..."
                                value={values.description}
                                onChange={changeHandler}
                            />
                        </Form.Group>
                        <Button variant="btn btn-dark mt-3 btn-outline-tertiary" type="submit">
                            Save
                        </Button>
                    </Form>
                </Container>
            )}
        </>
    );
}

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { useState } from 'react';
import { useForm } from '../../hooks/abstracts/useForm.js';
import { useEditProduct, useGetOneProduct } from '../../hooks/custom/useProducts.js';

import LoadingSpinner from '../loading-spinner/LoadingSpinner.jsx';
import InputErrorMessage from '../error-messages/InputErrorMessage.jsx';
import { validateInputs } from '../../util/validateInputs.js';
import { productSchema } from '../../validation-schemas/product.js';

import paths from '../../config/paths.js';

export default function EditProduct() {
    const [validationErrors, setValidationErrors] = useState({});
    const [serverError, setServerError] = useState({});

    const navigate = useNavigate();
    const editProduct = useEditProduct();

    const { productId } = useParams();
    const { product, isLoading } = useGetOneProduct(productId);

    const editHandler = async (values) => {
        try {
            const { data, errors, success } = validateInputs(productSchema, values);

            if (!success) {
                throw errors;
            }

            await editProduct(productId, data);
            navigate(paths.details.getHref(productId));
        } catch (error) {
            if (error.message) {
                setServerError(error);
                setValidationErrors({});
            } else {
                setValidationErrors(error);
                setServerError({});
            }
        }
    };

    const { values, changeHandler, submitHandler } = useForm(product, editHandler);

    return (
        <>
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <Container className="container-sm col-8 col-md-7 col-lg-5 mt-5 mb-4 p-4 p-lg-5 bg-dark-subtle shadow rounded-3">
                    {serverError && <p className="text-danger">{serverError.message}</p>}
                    <Form onSubmit={submitHandler}>
                        <Link to={paths.details.getHref(productId)}>
                            <i className="fa-solid fa-arrow-left fa-lg mb-3 text-dark"></i>
                        </Link>
                        <h2>Edit product</h2>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Name</Form.Label>
                            {validationErrors.name && <InputErrorMessage text={validationErrors.name} />}
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Short sleeve t-shirt"
                                value={values.name}
                                onChange={changeHandler}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Brand</Form.Label>
                            {validationErrors.brand && <InputErrorMessage text={validationErrors.brand} />}
                            <Form.Control
                                type="text"
                                name="brand"
                                placeholder="Nike"
                                value={values.brand}
                                onChange={changeHandler}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Category</Form.Label>
                            {validationErrors.category && <InputErrorMessage text={validationErrors.category} />}
                            <Form.Select
                                size="sm"
                                name="category"
                                className="border rounded p-2"
                                value={values.category}
                                onChange={changeHandler}
                            >
                                <option>T-shirts</option>
                                <option>Shorts</option>
                                <option>Sweatshirts</option>
                                <option>Pants</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Price</Form.Label>
                            {validationErrors.price && <InputErrorMessage text={validationErrors.price} />}
                            <Form.Control
                                type="number"
                                min="0.01"
                                step="0.01"
                                name="price"
                                value={values.price}
                                onChange={changeHandler}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Image URL</Form.Label>
                            {validationErrors.imageUrl && <InputErrorMessage text={validationErrors.imageUrl} />}
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
                            {validationErrors.summary && <InputErrorMessage text={validationErrors.summary} />}
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
                            {validationErrors.description && <InputErrorMessage text={validationErrors.description} />}
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

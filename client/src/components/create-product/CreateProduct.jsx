import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import InputErrorMessage from '../error-messages/InputErrorMessage.jsx';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/abstracts/useForm.js';
import { useCreateProduct } from '../../hooks/custom/useProducts.js';
import { productSchema } from '../../validation-schemas/product.js';
import { validateInputs } from '../../util/validateInputs.js';

import paths from '../../config/paths.js';

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
    const [validationErrors, setValidationErrors] = useState({});
    const [serverError, setServerError] = useState({});

    const navigate = useNavigate();
    const createProduct = useCreateProduct();

    const createHandler = async (values) => {
        try {
            const { data, errors, success } = validateInputs(productSchema, values);

            if (!success) {
                throw errors;
            }

            const product = await createProduct(data);
            navigate(paths.details.getHref(product._id));
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

    const { values, changeHandler, submitHandler } = useForm(initialValues, createHandler);

    return (
        <Container className="container-sm col-10 col-sm-8 col-md-7 col-lg-6 col-xl-5 mt-5 mb-4 p-4 p-lg-5 bg-dark-subtle shadow rounded-3">
            {serverError && <p className="text-danger">{serverError.message}</p>}
            <Form onSubmit={submitHandler}>
                <h2>Add product</h2>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Name</Form.Label>
                    {validationErrors.name && <InputErrorMessage text={validationErrors.name} />}
                    <Form.Control
                        className={validationErrors.name ? 'input-error' : ''}
                        value={values.name}
                        onChange={changeHandler}
                        name="name"
                        type="text"
                        placeholder="Short sleeve t-shirt"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                    <Form.Label>Brand</Form.Label>
                    {validationErrors.brand && <InputErrorMessage text={validationErrors.brand} />}
                    <Form.Control
                        className={validationErrors.brand ? 'input-error' : ''}
                        value={values.brand}
                        onChange={changeHandler}
                        name="brand"
                        type="text"
                        placeholder="Nike"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                    <Form.Label>Category</Form.Label>
                    {validationErrors.category && <InputErrorMessage text={validationErrors.category} />}
                    <Form.Select
                        className={validationErrors.category ? 'input-error border rounded p-2' : 'border rounded p-2'}
                        value={values.category}
                        onChange={changeHandler}
                        name="category"
                        size="sm"
                    >
                        <option>T-shirts</option>
                        <option>Shorts</option>
                        <option>Sweatshirts</option>
                        <option>Pants</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                    <Form.Label>Price</Form.Label>
                    {validationErrors.price && <InputErrorMessage text={validationErrors.price} />}
                    <Form.Control
                        className={validationErrors.price ? 'input-error' : ''}
                        value={values.price}
                        onChange={changeHandler}
                        name="price"
                        type="number"
                        min="0.01"
                        step="0.01"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
                    <Form.Label>Image URL</Form.Label>
                    {validationErrors.imageUrl && <InputErrorMessage text={validationErrors.imageUrl} />}
                    <Form.Control
                        className={validationErrors.imageUrl ? 'input-error' : ''}
                        value={values.imageUrl}
                        onChange={changeHandler}
                        name="imageUrl"
                        type="text"
                        placeholder="https://..."
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
                    <Form.Label>Summary (up to 40 characters)</Form.Label>
                    {validationErrors.summary && <InputErrorMessage text={validationErrors.summary} />}
                    <Form.Control
                        className={validationErrors.summary ? 'input-error' : ''}
                        value={values.summary}
                        onChange={changeHandler}
                        name="summary"
                        type="text"
                        placeholder="comfortable cotton t-shirt"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput7">
                    <Form.Label>Full description</Form.Label>
                    {validationErrors.description && <InputErrorMessage text={validationErrors.description} />}
                    <Form.Control
                        as="textarea"
                        rows={3}
                        className={validationErrors.description ? 'input-error' : ''}
                        value={values.description}
                        onChange={changeHandler}
                        name="description"
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

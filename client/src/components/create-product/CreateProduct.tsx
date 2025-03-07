import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import InputErrorMessage from '../error-messages/InputErrorMessage.tsx';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/abstracts/useForm.ts';
import { useCreateProduct } from '../../hooks/custom/useProducts.ts';
import { productSchema } from '../../validation-schemas/product.ts';
import { validateInputs } from '../../util/validateInputs.ts';
import { Product } from '../../types/product.ts';

import paths from '../../config/paths.ts';

const initialValues: Product = {
    name: '',
    brand: '',
    category: 'T-shirts',
    price: 0,
    imageUrl: '',
    summary: '',
    description: '',
};

export default function CreateProduct() {
    const [validationErrors, setValidationErrors] = useState<Product | {}>({});
    const [serverError, setServerError] = useState<{ message?: string }>({});

    const navigate = useNavigate();
    const createProduct = useCreateProduct();

    const createHandler = async (values: Product) => {
        try {
            const { data, errors, success } = validateInputs<Product>(productSchema, values);

            if (!success) {
                throw errors;
            }

            const product = await createProduct(data as Product);
            navigate(paths.details.getHref(product._id));
        } catch (error) {
            if (error instanceof Error) {
                setServerError(error);
                setValidationErrors({});
            } else {
                setValidationErrors(error as Product);
                setServerError({});
            }
        }
    };

    const { values, changeHandler, submitHandler } = useForm<Product>(initialValues, createHandler);

    return (
        <Container className="container-sm col-10 col-sm-8 col-md-7 col-lg-6 col-xl-5 mt-5 mb-4 p-4 p-lg-5 bg-dark-subtle shadow rounded-3">
            {serverError && <p className="text-danger">{serverError.message}</p>}
            <Form onSubmit={submitHandler}>
                <h2>Add product</h2>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Name</Form.Label>
                    {'name' in validationErrors && <InputErrorMessage text={validationErrors?.name} />}
                    <Form.Control
                        className={'name' in validationErrors ? 'input-error' : ''}
                        value={values.name}
                        onChange={changeHandler}
                        name="name"
                        type="text"
                        placeholder="Short sleeve t-shirt"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                    <Form.Label>Brand</Form.Label>
                    {'brand' in validationErrors && <InputErrorMessage text={validationErrors.brand} />}
                    <Form.Control
                        className={'brand' in validationErrors ? 'input-error' : ''}
                        value={values.brand}
                        onChange={changeHandler}
                        name="brand"
                        type="text"
                        placeholder="Nike"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                    <Form.Label>Category</Form.Label>
                    {'category' in validationErrors && <InputErrorMessage text={validationErrors.category} />}
                    <Form.Select
                        className={'category' in validationErrors ? 'input-error border rounded p-2' : 'border rounded p-2'}
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
                    {'price' in validationErrors && <InputErrorMessage text={validationErrors.price.toString()} />}
                    <Form.Control
                        className={'price' in validationErrors ? 'input-error' : ''}
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
                    {'imageUrl' in validationErrors && <InputErrorMessage text={validationErrors.imageUrl} />}
                    <Form.Control
                        className={'imageUrl' in validationErrors ? 'input-error' : ''}
                        value={values.imageUrl}
                        onChange={changeHandler}
                        name="imageUrl"
                        type="text"
                        placeholder="https://..."
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
                    <Form.Label>Summary (up to 40 characters)</Form.Label>
                    {'summary' in validationErrors && <InputErrorMessage text={validationErrors.summary} />}
                    <Form.Control
                        className={'summary' in validationErrors ? 'input-error' : ''}
                        value={values.summary}
                        onChange={changeHandler}
                        name="summary"
                        type="text"
                        placeholder="comfortable cotton t-shirt"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput7">
                    <Form.Label>Full description</Form.Label>
                    {'description' in validationErrors && <InputErrorMessage text={validationErrors.description} />}
                    <Form.Control
                        as="textarea"
                        rows={3}
                        className={'description' in validationErrors ? 'input-error' : ''}
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

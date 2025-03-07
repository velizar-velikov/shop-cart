import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { useState } from 'react';
import { useForm } from '../../hooks/abstracts/useForm.ts';
import { useEditProduct, useGetOneProduct } from '../../hooks/custom/useProducts.ts';

import LoadingSpinner from '../loading-spinner/LoadingSpinner.tsx';
import InputErrorMessage from '../error-messages/InputErrorMessage.tsx';
import { validateInputs } from '../../util/validateInputs.ts';
import { productSchema } from '../../validation-schemas/product.ts';

import paths from '../../config/paths.ts';
import { Product } from '../../types/product.ts';

export default function EditProduct() {
    const [validationErrors, setValidationErrors] = useState<Product | {}>({});
    const [serverError, setServerError] = useState<{ message?: string }>({});

    const navigate = useNavigate();
    const editProduct = useEditProduct();

    const { productId } = useParams<string>() as { productId: string };
    const { product, isLoading } = useGetOneProduct(productId);

    const editHandler = async (values: Product) => {
        try {
            const { data, errors, success } = validateInputs<Product>(productSchema, values);

            if (!success) {
                throw errors;
            }

            await editProduct(productId, data);
            navigate(paths.details.getHref(productId));
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

    const { values, changeHandler, submitHandler } = useForm<Product>(product, editHandler);

    return (
        <>
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <Container className="container-sm col-10 col-sm-8 col-md-7 col-lg-6 col-xl-5 mt-5 mb-4 p-4 p-lg-5 bg-dark-subtle shadow rounded-3">
                    {serverError && <p className="text-danger">{serverError.message}</p>}
                    <Form onSubmit={submitHandler}>
                        <Link to={paths.details.getHref(productId)}>
                            <i className="fa-solid fa-arrow-left fa-lg mb-3 text-dark"></i>
                        </Link>
                        <h2>Edit product</h2>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Name</Form.Label>
                            {'name' in validationErrors && <InputErrorMessage text={validationErrors.name} />}
                            <Form.Control
                                className={'name' in validationErrors ? 'input-error' : ''}
                                type="text"
                                name="name"
                                placeholder="Short sleeve t-shirt"
                                value={values.name}
                                onChange={changeHandler}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Brand</Form.Label>
                            {'brand' in validationErrors && <InputErrorMessage text={validationErrors.brand} />}
                            <Form.Control
                                className={'brand' in validationErrors ? 'input-error' : ''}
                                type="text"
                                name="brand"
                                placeholder="Nike"
                                value={values.brand}
                                onChange={changeHandler}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                            <Form.Label>Category</Form.Label>
                            {'category' in validationErrors && <InputErrorMessage text={validationErrors.category} />}
                            <Form.Select
                                className={
                                    'category' in validationErrors ? 'input-error border rounded p-2' : 'border rounded p-2'
                                }
                                size="sm"
                                name="category"
                                value={values.category}
                                onChange={changeHandler}
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
                                type="number"
                                min="0.01"
                                step="0.01"
                                name="price"
                                value={values.price}
                                onChange={changeHandler}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
                            <Form.Label>Image URL</Form.Label>
                            {'imageUrl' in validationErrors && <InputErrorMessage text={validationErrors.imageUrl} />}
                            <Form.Control
                                className={'imageUrl' in validationErrors ? 'input-error' : ''}
                                type="text"
                                name="imageUrl"
                                placeholder="https://..."
                                value={values.imageUrl}
                                onChange={changeHandler}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
                            <Form.Label>Summary (up to 40 characters)</Form.Label>
                            {'summary' in validationErrors && <InputErrorMessage text={validationErrors.summary} />}
                            <Form.Control
                                className={'summary' in validationErrors ? 'input-error' : ''}
                                type="text"
                                name="summary"
                                placeholder="comfortable cotton t-shirt"
                                value={values.summary}
                                onChange={changeHandler}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput7">
                            <Form.Label>Full description</Form.Label>
                            {'description' in validationErrors && <InputErrorMessage text={validationErrors.description} />}
                            <Form.Control
                                as="textarea"
                                rows={3}
                                className={'description' in validationErrors ? 'input-error' : ''}
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

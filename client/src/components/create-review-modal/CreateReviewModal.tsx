import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from '../../hooks/abstracts/useForm.ts';
import { useAddReviewForProduct } from '../../hooks/custom/useReviews.ts';

import { useAuthContext } from '../../contexts/AuthContext.tsx';
import { validateInputs } from '../../util/validateInputs.ts';
import { reviewSchema } from '../../validation-schemas/review.ts';
import InputErrorMessage from '../error-messages/InputErrorMessage.js';
import { toast } from 'react-toastify';
import { Review } from '../../types/review.ts';

const initialValues: Review = {
    rating: '5',
    text: '',
};

interface CreateReviewModalProps {
    show: () => void;
    handleClose: () => void;
    updateDetails: () => void;
}

export default function CreateReviewModal({ show, handleClose, updateDetails }: CreateReviewModalProps) {
    const [validationErrors, setValidationErrors] = useState<Review | {}>({});
    const [serverError, setServerError] = useState<{ message?: string }>({});

    const { productId } = useParams<string>() as { productId: string };
    const { firstName, lastName } = useAuthContext();
    const userFullName = `${firstName} ${lastName}`;
    const addReview = useAddReviewForProduct();

    const addReviewHandler = async (values: Review) => {
        try {
            const { data, errors, success } = validateInputs<Review>(reviewSchema, values);

            if (!success) {
                throw errors;
            }

            const notify = () => {
                toast.success(`Review added successfully.`, { autoClose: 2000 });
            };

            await addReview(productId, Number(data.rating), data.text, userFullName);
            handleClose();
            updateDetails();

            notify();
        } catch (error) {
            if (error instanceof Error) {
                setServerError(error);
                setValidationErrors({});
            } else {
                setValidationErrors(error as Review);
                setServerError({});
            }
        }
    };
    const { values, changeHandler, submitHandler } = useForm<Review>(initialValues, addReviewHandler);

    return (
        <>
            <Modal show={show as any} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add review</Modal.Title>
                </Modal.Header>
                <Form onSubmit={submitHandler}>
                    <Modal.Body>
                        {serverError && <p className="text-danger">{serverError.message}</p>}
                        <Form.Group className="col-5 col-xs-4 mt-1" controlId="exampleForm.ControlInput1">
                            <Form.Label>Rating (out of 5)</Form.Label>
                            {'rating' in validationErrors && <InputErrorMessage text={validationErrors.rating} />}
                            <Form.Select size="sm" name="rating" value={values.rating} onChange={changeHandler}>
                                <option>5</option>
                                <option>4</option>
                                <option>3</option>
                                <option>2</option>
                                <option>1</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea2">
                            <Form.Label>Describe your experience</Form.Label>
                            {'text' in validationErrors && <InputErrorMessage text={validationErrors.text} />}
                            <Form.Control
                                as="textarea"
                                rows={3}
                                className={'text' in validationErrors ? 'input-error' : ''}
                                name="text"
                                placeholder="My opinion about this product is..."
                                value={values.text}
                                onChange={changeHandler}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="button" variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button type="submit" variant="primary">
                            Publish
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}

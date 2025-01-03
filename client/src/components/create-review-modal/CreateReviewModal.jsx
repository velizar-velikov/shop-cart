import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from '../../hooks/abstracts/useForm.js';
import { useAddReviewForProduct } from '../../hooks/custom/useReviews.js';

import { useAuthContext } from '../../contexts/AuthContext.jsx';
import { validateInputs } from '../../util/validateInputs.js';
import { reviewSchema } from '../../validation-schemas/review.js';
import InputErrorMessage from '../error-messages/InputErrorMessage.jsx';
import { toast } from 'react-toastify';

const initialValues = {
    rating: '5',
    text: '',
};

// TODO: show feedback to user that he has successfully added his review
export default function CreateReviewModal({ show, handleClose, updateDetails, productName }) {
    const [validationErrors, setValidationErrors] = useState({});
    const [serverError, setServerError] = useState({});

    const { productId } = useParams();
    const { firstName, lastName } = useAuthContext();
    const userFullName = `${firstName} ${lastName}`;
    const addReview = useAddReviewForProduct();

    const addReviewHandler = async (values) => {
        try {
            const { data, errors, success } = validateInputs(reviewSchema, values);

            if (!success) {
                throw errors;
            }

            const notify = () => {
                toast.success(`Review added for ${productName}`, { autoClose: 3000 });
            };

            await addReview(productId, data.rating, data.text, userFullName);
            handleClose();
            updateDetails();

            notify();
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
    const { values, changeHandler, submitHandler } = useForm(initialValues, addReviewHandler);

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add review</Modal.Title>
                </Modal.Header>
                <Form onSubmit={submitHandler}>
                    <Modal.Body>
                        {serverError && <p className="text-danger">{serverError.message}</p>}
                        <Form.Group className="col-4 mt-1">
                            <Form.Label>Rating (out of 5)</Form.Label>
                            {validationErrors.rating && <InputErrorMessage text={validationErrors.rating} />}
                            <Form.Select size="sm" name="rating" value={values.rating} onChange={changeHandler}>
                                <option>5</option>
                                <option>4</option>
                                <option>3</option>
                                <option>2</option>
                                <option>1</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Describe your experience</Form.Label>
                            {validationErrors.text && <InputErrorMessage text={validationErrors.text} />}
                            <Form.Control
                                as="textarea"
                                rows={3}
                                className={validationErrors.text ? 'input-error' : ''}
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

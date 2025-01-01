import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { useAddReviewForProduct } from '../../hooks/custom/useReviews.js';
import { useParams } from 'react-router-dom';
import { useForm } from '../../hooks/abstracts/useForm.js';

import { useAuthContext } from '../../contexts/AuthContext.jsx';

const initialValues = {
    rating: '5',
    text: '',
};

// TODO: show feedback to user that he has successfully added his review
export default function CreateReviewModal({ show, handleClose, updateDetails }) {
    const { productId } = useParams();
    const { firstName, lastName } = useAuthContext();
    const userFullName = `${firstName} ${lastName}`;
    const addReview = useAddReviewForProduct();

    const addReviewHandler = async ({ rating, text }) => {
        const rating_sanitized = rating.trim();
        const text_sanitized = text.trim();

        try {
            if (!rating_sanitized || !text_sanitized) {
                throw new Error('All fields are required.');
            }

            await addReview(productId, rating_sanitized, text_sanitized, userFullName);
            handleClose();
            updateDetails();
        } catch (error) {
            console.log(error.message);
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
                        <Form.Group className="col-4 mt-1">
                            <Form.Label>Rating (out of 5)</Form.Label>
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
                            <Form.Control
                                as="textarea"
                                rows={3}
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

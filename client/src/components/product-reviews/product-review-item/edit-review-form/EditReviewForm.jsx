import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import { useForm } from '../../../../hooks/abstracts/useForm.js';
import { useEditReviewForProduct } from '../../../../hooks/custom/useReviews.js';
import InputErrorMessage from '../../../error-messages/InputErrorMessage.jsx';

export default function EditReviewForm({ reviewId, textState, setTextState, setIsEditing }) {
    const [validationErrors, setValidationErrors] = useState({});
    const [serverError, setServerError] = useState({});

    const editReview = useEditReviewForProduct();

    const onSaveEdittedReview = async (values) => {
        values.text = values.text.trim();

        try {
            if (!values.text) {
                throw new Error('At least one character is required to save the review.');
            }
            const result = await editReview(reviewId, values.text);

            setTextState((oldState) => ({ ...oldState, text: values.text }));
            setIsEditing(false);
        } catch (error) {
            if (error.code) {
                setServerError(error);
                setValidationErrors({});
            } else {
                setValidationErrors(error);
                setServerError({});
            }
        }
    };

    const { values, changeHandler, submitHandler } = useForm(textState, onSaveEdittedReview);

    return (
        <Form className="d-flex gap-4 align-items-center" onSubmit={submitHandler}>
            <div className="w-75">
                {serverError && <p className="text-danger mb-1">{serverError.message}</p>}
                {validationErrors.message && <InputErrorMessage text={validationErrors.message} />}
                <Form.Control
                    as="textarea"
                    className={validationErrors.message ? 'input-error' : ''}
                    name="text"
                    value={values.text}
                    onChange={changeHandler}
                />
            </div>
            <Button type="submit" className="border btn-light rounded px-2 py-1 shadow h-25">
                Save
            </Button>
        </Form>
    );
}

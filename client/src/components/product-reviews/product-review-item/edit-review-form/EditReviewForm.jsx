import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import { useForm } from '../../../../hooks/abstracts/useForm.ts';
import { useEditReviewForProduct } from '../../../../hooks/custom/useReviews.ts';
import InputErrorMessage from '../../../error-messages/InputErrorMessage.tsx';

import styles from './editReviewForm.module.css';

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

    const autosizeFunction = (event) => {
        event.target.parentNode.dataset.replicatedValue = event.target.value;
    };

    return (
        <Form className="d-flex flex-wrap gap-4 align-items-center" onSubmit={submitHandler}>
            <div className="col-12 col-md-8 col-lg-9">
                {serverError && <p className="text-danger mb-1">{serverError.message}</p>}
                {validationErrors.message && <InputErrorMessage text={validationErrors.message} />}
                <div className={styles['grow-wrap']}>
                    <Form.Control
                        as="textarea"
                        id="autosizing"
                        onInput={autosizeFunction}
                        rows="3"
                        className={validationErrors.message ? 'input-error' : ''}
                        name="text"
                        value={values.text}
                        onChange={changeHandler}
                    />
                </div>
            </div>
            <Button type="submit" className="border btn-light rounded px-2 py-1 shadow h-25">
                Save
            </Button>
        </Form>
    );
}

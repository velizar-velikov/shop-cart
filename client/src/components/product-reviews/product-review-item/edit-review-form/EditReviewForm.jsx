import { Button, Form } from 'react-bootstrap';
import { useForm } from '../../../../hooks/useForm.js';
import { useEditReviewForProduct } from '../../../../hooks/useReviews.js';

export default function EditReviewForm({ reviewId, textState, setTextState, setIsEditing }) {
    const editReview = useEditReviewForProduct();

    const onSaveEdittedReview = async (values) => {
        values.text = values.text.trim();

        try {
            if (!values.text) {
                throw new Error('You need to write at least one character to review product.');
            }

            const result = await editReview(reviewId, values.text);

            setTextState((oldState) => ({ ...oldState, text: values.text }));
            setIsEditing(false);
        } catch (error) {
            console.log(error.message);
        }
    };

    const { values, changeHandler, submitHandler } = useForm(textState, onSaveEdittedReview);

    return (
        <Form className="d-flex gap-4" onSubmit={submitHandler}>
            <Form.Control as="textarea" className="w-75" name="text" value={values.text} onChange={changeHandler} />
            <Button type="submit" className="border btn-light rounded px-2 py-1 shadow h-25">
                Save
            </Button>
        </Form>
    );
}

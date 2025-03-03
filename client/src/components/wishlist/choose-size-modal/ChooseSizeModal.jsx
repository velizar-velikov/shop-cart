import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useAddToUserCartHandler } from '../../../hooks/custom/useCart.ts';
import { useForm } from '../../../hooks/abstracts/useForm.ts';
import InputErrorMessage from '../../error-messages/InputErrorMessage.tsx';

const initialValues = {
    size: '---',
    quantity: '1',
};

export default function ChooseSizeModal({ show, handleClose, productId, name, inStockSizes }) {
    const { addToCartHandler, maxQuantities, errorMessage } = useAddToUserCartHandler(productId, inStockSizes, handleClose);

    const { values, changeHandler, submitHandler } = useForm(initialValues, addToCartHandler);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <span className="small">Choose size: </span>
                    <br></br>
                    <span>{name}</span>
                </Modal.Title>
            </Modal.Header>
            <Form onSubmit={submitHandler}>
                <Modal.Body>
                    {errorMessage && <InputErrorMessage text={errorMessage} />}
                    <div className="d-flex gap-2">
                        <Form.Group className="col-4 mt-1" controlId="controlInput1">
                            <Form.Label>Size</Form.Label>
                            <Form.Select type="text" name="size" value={values.size} onChange={changeHandler}>
                                <option value="---">---</option>
                                <option disabled={maxQuantities.small == 0} value="small">
                                    S{maxQuantities.small <= 3 && <p> ({maxQuantities.small} left)</p>}
                                </option>
                                <option disabled={maxQuantities.medium == 0} value="medium">
                                    M{maxQuantities.medium <= 3 && <p> ({maxQuantities.medium} left)</p>}
                                </option>
                                <option disabled={maxQuantities.large == 0} value="large">
                                    L{maxQuantities.large <= 3 && <p> ({maxQuantities.large} left)</p>}
                                </option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="col-4 mt-1" controlId="controlInput2">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                                type="number"
                                min="1"
                                max={maxQuantities[values.size] || 1}
                                name="quantity"
                                value={values.quantity}
                                onChange={changeHandler}
                            ></Form.Control>
                        </Form.Group>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="button" variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button type="submit" variant="primary">
                        Add to cart
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

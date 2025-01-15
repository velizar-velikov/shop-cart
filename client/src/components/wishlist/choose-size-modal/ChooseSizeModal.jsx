import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useAddToUserCart, useGetMaxQuantitiesToAddToCart } from '../../../hooks/custom/useCart.js';
import { useAuthContext } from '../../../contexts/AuthContext.jsx';
import { useForm } from '../../../hooks/abstracts/useForm.js';
import { useState } from 'react';
import InputErrorMessage from '../../error-messages/InputErrorMessage.jsx';
import { useCartContext } from '../../../contexts/CartContext.jsx';
import { toast } from 'react-toastify';

const initialValues = {
    size: '---',
    quantity: '1',
};

export default function ChooseSizeModal({ show, handleClose, productId, name, inStockSizes }) {
    const [errorMessage, setErrorMessage] = useState('');
    const { userId } = useAuthContext();

    let { maxQuantities, setMaxQuantities } = useGetMaxQuantitiesToAddToCart(productId, userId, inStockSizes);

    const { setUserCartProducts, cartReducer } = useCartContext();

    const addToUserCart = useAddToUserCart();

    const addToCartHandler = async (values) => {
        console.log(values);
        try {
            if (!values.quantity || !values.size) {
                throw new Error('All field are required.');
            }

            if (values.size === '---') {
                throw new Error('Please specify size first');
            }

            if (maxQuantities[values.size] <= 0) {
                return;
            }

            const notify = () => {
                toast.success(`Product added to cart.`, { autoClose: 2000 });
            };

            const cartItemResponse = await addToUserCart(productId, userId, values.size, values.quantity);

            setMaxQuantities((oldSizes) => ({
                ...oldSizes,
                [values.size]: oldSizes[values.size] - values.quantity,
            }));

            cartItemResponse.sizes = inStockSizes;

            const action = {
                type: 'add_cart_product',
                payload: {
                    productId,
                    qunatity: values.quantity,
                    size: values.size,
                    cartItemResponse,
                },
            };
            setUserCartProducts((state) => cartReducer(state, action));
            handleClose();
            setErrorMessage('');

            notify();
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

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

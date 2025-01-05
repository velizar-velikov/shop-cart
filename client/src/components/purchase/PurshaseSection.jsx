import { Button, Container, Form } from 'react-bootstrap';
import PurchaseItem from './purchase-item/PurchaseItem.jsx';
import { useCartContext } from '../../contexts/CartContext.jsx';
import { useForm } from '../../hooks/abstracts/useForm.js';
import { validateInputs } from '../../util/validateInputs.js';
import { orderSchema } from '../../validation-schemas/order.js';
import InputErrorMessage from '../error-messages/InputErrorMessage.jsx';
import { useState } from 'react';
import { useMakeOrder } from '../../hooks/custom/useOrders.js';

const initialValues = {
    address: '',
    payment: '',
};

export default function PurchaseSection() {
    const [validationErrors, setValidationErrors] = useState({});
    const [serverError, setServerError] = useState({});

    const { userCartProducts, totalPrice } = useCartContext();

    const makeOrder = useMakeOrder();

    const orderHandler = async (values) => {
        values.payment = values.payment.trim();

        try {
            const { data, errors, success } = validateInputs(orderSchema, values);

            if (!success) {
                if (!values.payment) {
                    errors.payment = 'Please specify payment method';
                }

                throw errors;
            }
            console.log(values);
            const order = await makeOrder();
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

    const { values, changeHandler, submitHandler } = useForm(initialValues, orderHandler);

    return (
        <Container className="container-sm col-12 col-md-10 col-lg-7 mt-5 mb-5 p-4 p-lg-5 bg-dark-subtle shadow rounded-3">
            <Form onSubmit={submitHandler}>
                <header className="d-flex justify-content-between align-items-center">
                    <h2>Order Details</h2>
                    <div className="d-flex align-items-center gap-4">
                        <h4 className="pt-2 fw-bold">
                            <span className="fs-5 fw-normal">Total:</span> {`$${totalPrice.toFixed(2)}`}
                        </h4>
                        <Button type="submit" className="h-25 btn-dark mx-1">
                            Confirm and order
                        </Button>
                    </div>
                </header>
                <Container className="mt-4 px-3 py-5 bg-light border rounded shadow">
                    {serverError && <p className="text-danger">{serverError.message}</p>}
                    <Form.Group className="mb-5 mx-2" controlId="controlId1">
                        <Form.Label className="fs-5">Delivery adress</Form.Label>
                        {validationErrors.address && <InputErrorMessage text={validationErrors.address} />}
                        <Form.Control
                            type="text"
                            name="address"
                            value={values.address}
                            onChange={changeHandler}
                            placeholder="London Cenrtal Park str. 8"
                        />
                    </Form.Group>
                    <div key="default-radio" className="mb-5 mx-2" value={values.payment} onChange={changeHandler}>
                        <Form.Label className="fs-5">Payment method</Form.Label>
                        {validationErrors.payment && <InputErrorMessage text={validationErrors.payment} />}
                        <Form.Check type="radio" label="Visa" name="payment" id="visa" value="visa" />
                        <Form.Check type="radio" label="Mastercard" name="payment" id="mastercard" value="mastercard" />
                        <Form.Check type="radio" label="Cash on Delivery" name="payment" id="cash" value="cash" />
                    </div>
                    <Container className="px-0 pt-3 border rounded-1">
                        <h4 className="m-0 pb-2 px-3 pt-2 border-bottom">Order review</h4>
                        <Container className="d-flex gap-2 flex-wrap p-3 pt-4">
                            {userCartProducts.map((product) => (
                                <PurchaseItem key={product._id} {...product} />
                            ))}
                        </Container>
                    </Container>
                </Container>
            </Form>
        </Container>
    );
}

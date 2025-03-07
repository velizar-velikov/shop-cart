import { Button, Container, Form } from 'react-bootstrap';
import { FormEventHandler, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/abstracts/useForm.ts';
import { UseCartContext } from '../../contexts/CartContext.tsx';
import { useMakeOrder } from '../../hooks/custom/useOrders.ts';
import { validateInputs } from '../../util/validateInputs.ts';
import { orderSchema } from '../../validation-schemas/order.ts';
import InputErrorMessage from '../error-messages/InputErrorMessage.tsx';
import PurchaseItem from './purchase-item/PurchaseItem.tsx';
import { toast } from 'react-toastify';
import { PaymentType } from '../../types/order.ts';

type PaymentDetails = {
    address: string;
    payment: PaymentType | string;
};

const initialValues: PaymentDetails = {
    address: '',
    payment: '',
};

export default function PurchaseSection() {
    const [validationErrors, setValidationErrors] = useState<PaymentDetails | {}>({});
    const [serverError, setServerError] = useState<{ message?: string }>({});

    const { userCartProducts, setUserCartProducts, totalPrice } = UseCartContext();

    const filteredProducts = userCartProducts.filter((product) => product.sizes[product.size] >= product.quantity);

    const navigate = useNavigate();
    const makeOrder = useMakeOrder();

    const orderHandler = async (values: PaymentDetails) => {
        values.payment = values.payment.trim() as PaymentType;

        const notify = () => toast.success('Your order has successfully been made.', { autoClose: 3500 });

        try {
            const { data, errors, success } = validateInputs(orderSchema, values);

            if (!success) {
                if (!values.payment) {
                    errors.payment = 'Please specify payment method';
                }

                throw errors;
            }

            const order = await makeOrder(data.address, data.payment as PaymentType);

            setUserCartProducts([]);
            notify();
            navigate('/purchase-success');
        } catch (error) {
            if (error instanceof Error) {
                setServerError(error);
                setValidationErrors({});
            } else {
                setValidationErrors(error as PaymentType);
                setServerError({});
            }
        }
    };

    const { values, changeHandler, submitHandler } = useForm<PaymentDetails>(initialValues, orderHandler);

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
                        {'address' in validationErrors && <InputErrorMessage text={validationErrors.address} />}
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
                        {'payment' in validationErrors && <InputErrorMessage text={validationErrors.payment} />}
                        <Form.Check type="radio" label="Visa" name="payment" id="visa" value="visa" />
                        <Form.Check type="radio" label="Mastercard" name="payment" id="mastercard" value="mastercard" />
                        <Form.Check type="radio" label="Cash on Delivery" name="payment" id="cash" value="cash" />
                    </div>
                    <Container className="px-0 pt-3 border rounded-1">
                        <h4 className="m-0 pb-2 px-3 pt-2 border-bottom">Order review</h4>
                        <Container className="d-flex gap-2 flex-wrap p-3 pt-4">
                            {filteredProducts.map((product) => (
                                <PurchaseItem key={product._id} {...product} />
                            ))}
                        </Container>
                    </Container>
                </Container>
            </Form>
        </Container>
    );
}

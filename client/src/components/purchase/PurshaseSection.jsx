import { Button, Container, Form } from 'react-bootstrap';
import PurchaseItem from './purchase-item/PurchaseItem.jsx';

export default function PurchaseSection() {
    return (
        <Container className="container-sm col-12 col-md-10 col-lg-7 mt-5 mb-5 p-4 p-lg-5 bg-dark-subtle shadow rounded-3">
            <header className="d-flex justify-content-between align-items-center">
                <h2>Order Details</h2>
                <Button className="h-25 btn-dark mx-1">Confirm and order</Button>
            </header>
            <Container className="mt-4 px-3 py-5 bg-light border rounded shadow">
                <Form>
                    <Form.Group className="mb-5 mx-2" controlId="controlId1">
                        <Form.Label className="fs-5">Delivery adress</Form.Label>
                        <Form.Control type="text" placeholder="London Cenrtal Park str. 8" />
                    </Form.Group>
                    <div key="default-radio" className="mb-5 mx-2">
                        <Form.Label className="fs-5">Payment method</Form.Label>
                        <Form.Check type="radio" label="Visa" name="payment" id="visa" value="visa" />
                        <Form.Check type="radio" label="MasterCard" name="payment" id="mastercard" value="mastercard" />
                    </div>
                    <Container className="px-0 pt-3 border rounded-1">
                        <h4 className="m-0 pb-2 px-3 pt-2 border-bottom">Order review</h4>
                        <Container className="d-flex gap-2 flex-wrap p-3 pt-4">
                            <PurchaseItem />
                            <PurchaseItem />
                            <PurchaseItem />
                            <PurchaseItem />
                            <PurchaseItem />
                            <PurchaseItem />
                            <PurchaseItem />
                            <PurchaseItem />
                        </Container>
                    </Container>
                </Form>
            </Container>
        </Container>
    );
}

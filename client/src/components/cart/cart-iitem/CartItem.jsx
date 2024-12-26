import { Button, Card, Col, Row } from 'react-bootstrap';

export default function CartItem({ size, quantity, productInfo }) {
    return (
        <Row className="d-flex flex-column flex-xs-row flex-sm-row flex-md-row flex-lg-row mt-4 p-2 border rounded shadow">
            <Col sm={2} className="d-flex justify-content-center align-items-center">
                <Card>
                    <img src={productInfo.imageUrl} />
                </Card>
            </Col>
            <Col sm={10} className="position-relative d-flex flex-column justify-content-around">
                <div className="d-flex align-items-center gap-4">
                    <h5 className="text-secondary">{productInfo.brand}</h5>
                    <h3 className="w-75">{productInfo.name}</h3>
                </div>
                <h4 className="position-absolute bottom-0 end-0">${productInfo.price}</h4>
                <div className="d-flex gap-3 align-items-center">
                    <p>
                        Size: <span>{size}</span>
                    </p>
                    <p>
                        Amount: <span>{quantity}</span>
                    </p>

                    <Button className="btn-secondary position-absolute top-0 end-0">
                        <i className="fa-solid fa-trash fa"></i>
                    </Button>
                </div>
            </Col>
        </Row>
    );
}

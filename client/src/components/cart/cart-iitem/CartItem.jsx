import { Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function CartItem({ size, quantity, productInfo }) {
    return (
        <Row className="d-flex flex-column flex-xs-row flex-sm-row flex-md-row flex-lg-row mt-4 bg-light border rounded shadow">
            <Col sm={2} className="p-3 p-sm-0 d-flex justify-content-center align-items-center">
                <Card as={Link} to={`/catalog/${productInfo._id}/details`}>
                    <img src={productInfo.imageUrl} />
                </Card>
            </Col>
            <Col sm={8} className="col-7 col-md-8 col-lg-8 col-xl-8 col-xxl-9 d-flex flex-column justify-content-around">
                <Link
                    className="d-flex align-items-center gap-4 text-decoration-none text-dark"
                    to={`/catalog/${productInfo._id}/details`}
                >
                    <h5 className="text-secondary">{productInfo.brand}</h5>
                    <h4 className="">{productInfo.name}</h4>
                </Link>
                <div className="d-flex gap-3 align-items-center">
                    <p>
                        Size: <span>{size}</span>
                    </p>
                    <p>
                        Amount: <span>{quantity}</span>
                    </p>
                </div>
            </Col>
            <Col sm={1} className="d-flex flex-column justify-content-between py-3">
                <i role="button" className="fa-solid fa-trash fa fa-2x text-danger"></i>
                <h4>${productInfo.price}</h4>
            </Col>
        </Row>
    );
}

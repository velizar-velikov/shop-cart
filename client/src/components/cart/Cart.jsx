import { Button, Col, Container, Form, Row } from 'react-bootstrap';

export default function Cart() {
    return (
        <Container className="container-sm col-12 col-md-10 col-lg-7 mt-5 p-4 p-lg-5 bg-dark-subtle shadow rounded-3">
            <h2>Your cart</h2>
            <Row className="d-flex flex-column flex-sm-row flex-md-row flex-lg-row mt-4 p-2 border rounded shadow">
                <Col sm={2} className="d-flex justify-content-center align-items-center">
                    <img
                        className="card-img"
                        src="https://www.tennis-point.co.uk/dw/image/v2/BBDP_PRD/on/demandware.static/-/Sites-master-catalog/default/dwf9d22348/images/004/454/52032000_000.jpg?q=80&sw=2000"
                    />
                </Col>
                <Col sm={10} className="position-relative d-flex flex-column justify-content-around">
                    <div className="d-flex align-items-center gap-4">
                        <h5 className="text-secondary">Nike</h5>
                        <h3>Sports t-shirt</h3>
                    </div>
                    <h4 className="position-absolute bottom-0 end-0">$49</h4>
                    <div className="d-flex gap-3 align-items-center">
                        <p>
                            Size: <span>S</span>
                        </p>
                        <p>
                            Amount: <span>1</span>
                        </p>

                        <Button className="btn-secondary position-absolute top-0 end-0">
                            <i className="fa-solid fa-trash fa"></i>
                        </Button>
                    </div>
                </Col>
            </Row>
            <Row className="d-flex flex-column flex-sm-row flex-md-row flex-lg-row mt-4 p-2 border rounded shadow">
                <Col sm={2} className="d-flex justify-content-center align-items-center">
                    <img
                        className="card-img"
                        src="https://www.tennis-point.co.uk/dw/image/v2/BBDP_PRD/on/demandware.static/-/Sites-master-catalog/default/dwf9d22348/images/004/454/52032000_000.jpg?q=80&sw=2000"
                    />
                </Col>
                <Col sm={10} className="position-relative d-flex flex-column justify-content-around">
                    <div className="d-flex align-items-center gap-4">
                        <h5 className="text-secondary">Nike</h5>
                        <h3>Sports t-shirt</h3>
                    </div>
                    <h4 className="position-absolute bottom-0 end-0">$49</h4>
                    <div className="d-flex gap-3 align-items-center">
                        <p>
                            Size: <span>S</span>
                        </p>
                        <p>
                            Amount: <span>1</span>
                        </p>

                        <Button className="btn-secondary position-absolute top-0 end-0">
                            <i className="fa-solid fa-trash fa"></i>
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

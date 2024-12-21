import { Button, Container } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import { Link } from 'react-router-dom';

export default function ProductReviews() {
    return (
        <Container className="container-sm col-8 col-md-7 col-lg-6 mt-5 p-4 p-lg-5 bg-dark-subtle shadow rounded-3">
            <div className="d-flex  mb-3">
                <Button as={Link} to="/catalog/:id/details" className="col-2 h-50">
                    Back
                </Button>
                <h3 className="col-6 col-md-8 text-center">Sports t-shirt reviews</h3>
            </div>
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>
                        <div className="rating d-flex gap-3">
                            <div className="stars">
                                <i className="fa fa-star text-warning"></i>
                                <i className="fa fa-star text-warning"></i>
                                <i className="fa fa-star text-warning"></i>
                                <i className="fa fa-star text-warning"></i>
                            </div>
                            <p className="">Peter Petrov</p>
                        </div>
                    </Accordion.Header>
                    <Accordion.Body>This t-shirt is very comfortable and ideal for gym sessions or outdoor runs</Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>
                        <div className="rating d-flex gap-3">
                            <div className="stars">
                                <i className="fa fa-star text-warning"></i>
                                <i className="fa fa-star text-warning"></i>
                                <i className="fa fa-star text-warning"></i>
                                <i className="fa fa-star text-warning"></i>
                            </div>
                            <p className="">John Johnson</p>
                        </div>
                    </Accordion.Header>
                    <Accordion.Body>This t-shirt is very good for the price</Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Container>
    );
}

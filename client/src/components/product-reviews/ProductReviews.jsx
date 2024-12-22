import { Button, Container } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import { Link, useParams } from 'react-router-dom';

export default function ProductReviews() {
    const { productId } = useParams();
    return (
        <Container className="container-sm col-8 col-md-7 col-lg-6 mt-5 p-4 p-lg-5 bg-dark-subtle shadow rounded-3">
            <div className="d-flex mb-3 gap-5">
                <Button as={Link} to={`/catalog/${productId}/details`} className="col-2 h-50">
                    Back
                </Button>
                <h3 className="text-center d-flex flex-wrap justify-content-center align-items-center gap-2">
                    <span>Sports t-shirt</span>
                    <span className="h6 text-secondary">Nike</span>
                    <span className="ms-3">reviews</span>
                </h3>
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

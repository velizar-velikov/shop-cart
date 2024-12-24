import Accordion from 'react-bootstrap/Accordion';

export default function ProductReviewItem({ index }) {
    console.log(index);

    return (
        <Accordion.Item eventKey={index.toString()}>
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
    );
}

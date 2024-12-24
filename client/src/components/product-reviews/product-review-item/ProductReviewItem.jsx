import Accordion from 'react-bootstrap/Accordion';

export default function ProductReviewItem({ index, text, reviewerFullName }) {
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
                    <p className="">{reviewerFullName}</p>
                </div>
            </Accordion.Header>
            <Accordion.Body>{text}</Accordion.Body>
        </Accordion.Item>
    );
}

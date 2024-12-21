import { Link } from 'react-router-dom';
import { Card, CardBody, CardTitle, CardText } from 'react-bootstrap';

export default function CatalogCard() {
    return (
        <div>
            <Card>
                <img
                    src="https://www.tennis-point.co.uk/dw/image/v2/BBDP_PRD/on/demandware.static/-/Sites-master-catalog/default/dwf9d22348/images/004/454/52032000_000.jpg?q=80&sw=2000"
                    alt="car"
                    className="card-img-top"
                />
                <CardBody>
                    <CardTitle>Jaguar</CardTitle>
                    <CardText>Some fast and comfortable car</CardText>
                    <Link to="/catalog/:id/details" className="btn btn-dark">
                        Details
                    </Link>
                </CardBody>
            </Card>
        </div>
    );
}

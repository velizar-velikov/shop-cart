import { Link } from 'react-router-dom';
import { Card, CardBody, CardTitle, CardText } from 'react-bootstrap';

export default function CatalogCard() {
    return (
        <div>
            <Card>
                <img src="../../../../img/car.jpg" alt="car" className="card-img-top" />
                <CardBody>
                    <CardTitle>Jaguar</CardTitle>
                    <CardText>Some fast and comfortable car</CardText>
                    <Link to="" className="btn btn-dark">
                        Details
                    </Link>
                </CardBody>
            </Card>
        </div>
    );
}

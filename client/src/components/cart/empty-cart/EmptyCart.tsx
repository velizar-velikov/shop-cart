import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import paths from '../../../config/paths.ts';

export default function EmptyCart() {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center mt-5">
            <p className="fs-4 text-center">Add product in cart to continue</p>
            <Button className="h-25 btn-dark" as={Link as any} to={paths.catalog.basePath}>
                Continue shopping
            </Button>
        </div>
    );
}

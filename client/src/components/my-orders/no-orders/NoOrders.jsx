import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import paths from '../../../config/paths.js';

export default function NoOrders() {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center mt-4">
            <p className="fs-3 text-center">You haven't made any orders yet.</p>
            <p className="fs-5 text-center text-dark mb-4">Browse our store to make your first order!</p>
            <Button className="px-3 py-2 h-25 btn-dark" as={Link} to={paths.catalog.basePath}>
                Browse store
            </Button>
        </div>
    );
}

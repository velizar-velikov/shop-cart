import { Button } from 'react-bootstrap';
import { Link, LinkProps } from 'react-router-dom';
import paths from '../../../config/paths.ts';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

export default function NoOrders() {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center mt-4">
            <p className="fs-3 text-center">You haven't made any orders yet.</p>
            <p className="fs-5 text-center text-dark mb-4">Browse our store to make your first order!</p>
            <Button
                className="px-3 py-2 h-25 btn-dark"
                as={Link as ForwardRefExoticComponent<LinkProps & RefAttributes<HTMLAnchorElement>> & 'symbol'}
                to={paths.catalog.basePath}
            >
                Browse store
            </Button>
        </div>
    );
}

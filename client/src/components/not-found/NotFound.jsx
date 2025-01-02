import { Link } from 'react-router-dom';
import paths from '../../config/paths.js';

export default function NotFound() {
    return (
        <div className="text-dark">
            <div className="d-flex align-items-center justify-content-center min-vh-100 px-2">
                <div className="text-center">
                    <h1 className="display-1 fw-bold">404</h1>
                    <p className="fs-2 fw-medium mt-4">Oops! Page not found</p>
                    <p className="mt-4 mb-5">The page you're looking for doesn't exist or has been moved.</p>
                    <Link to={paths.home.path} className="btn btn-dark px-4 py-2">
                        Go Home
                    </Link>
                </div>
            </div>
        </div>
    );
}

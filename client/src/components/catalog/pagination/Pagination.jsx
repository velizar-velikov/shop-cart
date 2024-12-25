import Pagination from 'react-bootstrap/Pagination';
import { Link } from 'react-router-dom';

export default function Paginator({ currentPage, setCurrentPage }) {
    return (
        <div className="d-flex justify-content-center mt-4">
            <Pagination>
                <Pagination.First onClick={() => setCurrentPage(1)} />
                <Pagination.Prev onClick={() => setCurrentPage((page) => page - 1)} />

                <Pagination.Item active>{currentPage}</Pagination.Item>

                <Pagination.Next onClick={() => setCurrentPage((page) => page + 1)} />
                <Pagination.Last />
            </Pagination>
        </div>
    );
}

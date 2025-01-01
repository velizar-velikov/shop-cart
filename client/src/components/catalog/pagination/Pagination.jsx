import Pagination from 'react-bootstrap/Pagination';
import { usePaginator } from '../../../hooks/usePaginator.js';

export default function Paginator({ currentPage, maxPage, setSearchParams }) {
    const { onBackHandler, onForwardHandler, onFirstPageHandler, onLastPageHandler } = usePaginator(
        currentPage,
        maxPage,
        setSearchParams
    );

    return (
        <div className="d-flex justify-content-center mt-4">
            <Pagination>
                <Pagination.First onClick={onFirstPageHandler} />
                <Pagination.Prev onClick={onBackHandler} />

                <Pagination.Item active>{currentPage}</Pagination.Item>

                <Pagination.Next onClick={onForwardHandler} />
                <Pagination.Last onClick={onLastPageHandler} />
            </Pagination>
        </div>
    );
}

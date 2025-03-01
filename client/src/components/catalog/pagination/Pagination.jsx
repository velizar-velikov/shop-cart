import Pagination from 'react-bootstrap/Pagination';
import { usePaginator } from '../../../hooks/custom/usePaginator.ts';

import styles from './pagination.module.css';

export default function Paginator({ currentPage, maxPage, setSearchParams }) {
    const {
        onBackHandler,
        onForwardHandler,
        onFirstPageHandler,
        onLastPageHandler,
        canGoFirst,
        canGoBack,
        canGoLast,
        canGoForward,
    } = usePaginator(currentPage, maxPage, setSearchParams);

    return (
        <div className="d-flex justify-content-center mt-4">
            <Pagination>
                <Pagination.First as="button" className={!canGoFirst ? styles.blurred : ''} onClick={onFirstPageHandler} />
                <Pagination.Prev as="button" className={!canGoBack ? styles.blurred : ''} onClick={onBackHandler} />

                <Pagination.Item active>{currentPage}</Pagination.Item>

                <Pagination.Next as="button" className={!canGoForward ? styles.blurred : ''} onClick={onForwardHandler} />
                <Pagination.Last as="button" className={!canGoLast ? styles.blurred : ''} onClick={onLastPageHandler} />
            </Pagination>
        </div>
    );
}

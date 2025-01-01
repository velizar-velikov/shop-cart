export function usePaginator(currentPage, maxPage, setSearchParams) {
    const onBackHandler = () => {
        if (currentPage - 1 < 1) {
            return;
        }
        setSearchParams((params) => {
            params.set('page', currentPage - 1);
            return params;
        });
    };

    const onForwardHandler = () => {
        if (currentPage + 1 > maxPage) {
            return;
        }
        setSearchParams((params) => {
            params.set('page', currentPage + 1);
            return params;
        });
    };

    const onFirstPageHandler = () => {
        if (maxPage == 1) {
            return;
        }
        setSearchParams((params) => {
            params.set('page', 1);
            return params;
        });
    };

    const onLastPageHandler = () => {
        if (maxPage == 1) {
            return;
        }
        setSearchParams((params) => {
            params.set('page', maxPage);
            return params;
        });
    };

    return { onBackHandler, onForwardHandler, onFirstPageHandler, onLastPageHandler };
}

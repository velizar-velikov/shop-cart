import { Row } from 'react-bootstrap';

import CatalogCard from '../catalog-card/CatalogCard.jsx';
import CatalogSearch from './catalog-search/CatalogSearch.jsx';
import Paginator from './pagination/Pagination.jsx';
import LoadingSpinner from '../loading-spinner/LoadingSpinner.jsx';

import { useState } from 'react';
import { useGetCatalogProducts } from '../../hooks/useProducts.js';

export default function Catalog() {
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState({
        category: 'All categories',
        name: '',
    });
    const { products, isLoading } = useGetCatalogProducts(currentPage, search);

    const updateSearch = (newSearch) => {
        setSearch((oldSearchState) => newSearch);
        setCurrentPage(1);
    };

    return (
        <>
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <section id="catalog" className="container-fluid overflow-hidden mb-4">
                    <h1 className="mt-4 text-center">Browse store</h1>
                    <CatalogSearch searchState={search} updateSearch={updateSearch} />
                    {products.length == 0 ? (
                        <p className="position-absolute top-50 start-50 translate-middle fs-1 px-3 py-2 px-lg-5 py-lg-3 rounded bg-dark-subtle">
                            No clothes yet.
                        </p>
                    ) : (
                        <div>
                            <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3 g-lg-4 m-auto">
                                {products.map((product) => (
                                    <CatalogCard key={product._id} {...product} />
                                ))}
                            </Row>
                            <Paginator currentPage={currentPage} setCurrentPage={setCurrentPage} />
                        </div>
                    )}
                </section>
            )}
        </>
    );
}

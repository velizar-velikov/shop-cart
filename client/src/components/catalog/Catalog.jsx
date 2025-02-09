import { Row } from 'react-bootstrap';

import CatalogCard from '../catalog-card/CatalogCard.jsx';
import CatalogSearch from './catalog-search/CatalogSearch.jsx';
import Paginator from './pagination/Pagination.jsx';
import LoadingSpinner from '../loading-spinner/LoadingSpinner.jsx';

import { useGetCatalogLength, useGetCatalogProducts } from '../../hooks/custom/useProducts.js';
import { useSearchParams } from 'react-router-dom';
import NoProducts from './no-products/NoProducts.jsx';
import { useSearch } from '../../hooks/custom/useSearch.js';

import styles from './catalog.module.css';

export default function Catalog() {
    const [searchParams, setSearchParams] = useSearchParams();
    const { search, setSearch } = useSearch(searchParams);

    let currentPage = Number(searchParams.get('page') || 1);

    const { products, isLoading } = useGetCatalogProducts(currentPage, search);
    const { length: catalogLength } = useGetCatalogLength(search);

    const maxPage = Math.ceil(catalogLength / 4);

    const updateSearch = (newSearch) => {
        setSearch(newSearch);
        currentPage = 1;
    };

    return (
        <>
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <section id="catalog" className="container-fluid overflow-hidden mb-4">
                    <h1 className="mt-4 text-center">Browse store</h1>
                    <CatalogSearch searchState={search} updateSearch={updateSearch} setSearchParams={setSearchParams} />
                    {products.length == 0 ? (
                        <NoProducts search={search} />
                    ) : (
                        <div>
                            <div className="d-flex justify-content-center">
                                <Row
                                    className={`w-100 row-cols-2 row-cols-sm-2 row-cols-md-4 row-cols-lg-4 g-1 g-sm-2 g-xl-3 m-auto ${styles.row}`}
                                >
                                    {products.map((product) => (
                                        <CatalogCard key={product._id} {...product} />
                                    ))}
                                </Row>
                            </div>
                            <Paginator currentPage={currentPage} maxPage={maxPage} setSearchParams={setSearchParams} />
                        </div>
                    )}
                </section>
            )}
        </>
    );
}

import requester from './request.js';

const host = 'http://localhost:3030';

const endpoints = {
    all: '/data/products',
    byId: (id) => `/data/products/${id}`,
};

async function getAll() {
    const urlParams = new URLSearchParams({
        where: 'inactive=false',
        sortBy: `_createdOn%20desc`,
    });
    const url = new URL(host + endpoints.all);
    url.search = decodeURIComponent(urlParams);

    return requester.get(url);
}

async function getCatalogProducts(currentPage, search) {
    const pageSize = 4;
    const category_search_string = search.category == 'All categories' ? '' : search.category;

    const urlParams = new URLSearchParams({
        where: `category LIKE "${category_search_string}" AND name LIKE "${search.name}" AND inactive=false`,
        offset: ((currentPage - 1) * pageSize).toString(),
        pageSize: pageSize.toString(),
    });

    const urlParamSort = new URLSearchParams({
        sortBy: '_createdOn%20desc',
    });

    const url = `${host}${endpoints.all}?${urlParams.toString()}&${decodeURIComponent(urlParamSort)}`;

    return requester.get(url);
}

function getLatest(productsCount) {
    const urlParams = new URLSearchParams({
        where: 'inactive=false',
        offset: '0',
        pageSize: productsCount,
    });

    const urlParamSort = new URLSearchParams({
        sortBy: '_createdOn%20desc',
    });

    const url = `${host}${endpoints.all}?${urlParams.toString()}&${decodeURIComponent(urlParamSort)}`;

    return requester.get(url);
}

function getOne(productId) {
    return requester.get(host + endpoints.byId(productId));
}

function create(data) {
    return requester.post(host + endpoints.all, { ...data, inactive: false });
}

function editById(productId, data) {
    return requester.patch(host + endpoints.byId(productId), data);
}

/**
 * The request only marks the product as inactive
 * as other collections (cart, orders, ...) reference it by relation
 * @param {string} productId
 * @returns
 */
function deleteById(productId) {
    return requester.patch(host + endpoints.byId(productId), { inactive: true });
}

function getDistinctCategories() {
    const urlParams = new URLSearchParams({
        where: 'inactive=false',
        distinct: 'category',
        select: 'category',
    });

    const url = `${host}${endpoints.all}?${urlParams.toString()}`;

    return requester.get(url);
}

const productsAPI = {
    getAll,
    getCatalogProducts,
    getLatest,
    getOne,
    create,
    editById,
    deleteById,
    getDistinctCategories,
};

export default productsAPI;

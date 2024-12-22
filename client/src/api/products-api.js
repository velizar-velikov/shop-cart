import requester from './request.js';

const host = 'http://localhost:3030';

const endpoints = {
    all: '/data/products',
    byId: (id) => `/data/products/${id}`,
};

function getAll() {
    return requester.get(host + endpoints.all);
}

function getLatest(productsCount) {
    const urlParams = new URLSearchParams({
        sortBy: '_createdOn%20desc',
        offset: '0',
        pageSize: productsCount,
    });

    const url = new URL(host + endpoints.all);
    url.search = decodeURIComponent(urlParams);

    return requester.get(url);
}

function getOne(productId) {
    return requester.get(host + endpoints.byId(productId));
}

function create(data) {
    return requester.post(host + endpoints.all, data);
}

function editById(productId, data) {
    return requester.put(host + endpoints.byId(productId), data);
}

function deleteById(productId) {
    return requester.delete(host + endpoints.byId(productId));
}

function getDistinctCategories() {
    const urlParams = new URLSearchParams({
        distinct: 'category',
        select: 'category',
    });

    const url = `${host}${endpoints.all}?${urlParams.toString()}`;

    return requester.get(url);
}

const productsAPI = {
    getAll,
    getLatest,
    getOne,
    create,
    editById,
    deleteById,
    getDistinctCategories,
};

export default productsAPI;

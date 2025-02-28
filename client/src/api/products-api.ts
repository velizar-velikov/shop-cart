import { Category, ProductResponse } from '../types/product.ts';
import { Sizes } from '../types/stock.ts';
import requester from './request.ts';
import stockAPI from './stock-api.ts';

const host = import.meta.env.VITE_API_URL;

const endpoints = {
    all: '/data/products',
    byId: (id: string) => `/data/products/${id}`,
};

async function getAll(): Promise<ProductResponse[]> {
    const urlParams = new URLSearchParams({
        where: 'inactive=false',
        sortBy: `_createdOn%20desc`,
    });
    const url = new URL(host + endpoints.all);
    url.search = decodeURIComponent(urlParams.toString());

    return requester.get(url.toString());
}

interface SearchOfUser {
    category: Category | 'All categories';
    name: string;
}

async function getCatalogProducts(currentPage: number, search: SearchOfUser): Promise<ProductResponse[]> {
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

    const url = `${host}${endpoints.all}?${urlParams.toString()}&${decodeURIComponent(urlParamSort.toString())}`;

    const response: ProductResponse[] & [{ sizes: Sizes }] = await requester.get(url);

    for (const product of response) {
        product.sizes = await stockAPI.getSizesForProduct(product._id);
    }

    return response;
}

async function getCalatogLength(search: SearchOfUser): Promise<number> {
    const category_search_string = search.category == 'All categories' ? '' : search.category;

    const urlParams = new URLSearchParams({
        where: `category LIKE "${category_search_string}" AND name LIKE "${search.name}" AND inactive=false`,
        count: '""',
    });

    const url = `${host}${endpoints.all}?${urlParams.toString()}`;

    return requester.get(url);
}

function getLatest(productsCount: number): Promise<ProductResponse[]> {
    const urlParams = new URLSearchParams({
        where: 'inactive=false',
        offset: '0',
        pageSize: productsCount.toString(),
    });

    const urlParamSort = new URLSearchParams({
        sortBy: '_createdOn%20desc',
    });

    const url = `${host}${endpoints.all}?${urlParams.toString()}&${decodeURIComponent(urlParamSort.toString())}`;

    return requester.get(url);
}

function getOne(productId: string): Promise<ProductResponse> {
    return requester.get(host + endpoints.byId(productId));
}

interface Product {
    name: string;
    brand: string;
    category: Category;
    price: number;
    imageUrl: string;
    summary: string;
    description: string;
}

function create(data: Product): Promise<ProductResponse> {
    return requester.post(host + endpoints.all, { ...data, inactive: false });
}

function editById(productId: string, data: Product): Promise<ProductResponse> {
    return requester.patch(host + endpoints.byId(productId), data);
}

/**
 * The request only marks the product as inactive
 * as other collections (cart, orders, ...) reference it by relation
 * @param {string} productId
 * @returns
 */
function deleteById(productId: string): Promise<ProductResponse> {
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
    getCalatogLength,
    getLatest,
    getOne,
    create,
    editById,
    deleteById,
    getDistinctCategories,
};

export default productsAPI;

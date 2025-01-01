const paths = {
    home: {
        path: '/',
    },
    catalog: {
        basePath: '/catalog',
        paths: ['/catalog', '/catalog/:category'],
        getHrefBase: () => `/catalog`,
    },
    createProduct: {
        path: '/create',
    },
    editProduct: {
        path: 'catalog/:productId/edit',
        getHref: (productId) => `/catalog/${productId}/edit`,
    },
    login: {
        path: '/login',
    },
    register: {
        path: '/register',
    },
    logout: {
        path: '/logout',
    },
    details: {
        path: '/details/:productId',
        getHref: (productId) => `/details/${productId}`,
    },
    reviews: {
        path: '/catalog/:productId/reviews',
        getHref: (productId) => `/catalog/${productId}/reviews`,
    },
    cart: {
        path: '/cart',
    },
};

export default paths;

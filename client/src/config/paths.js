const paths = {
    home: {
        path: '/',
    },
    catalog: {
        path: '/catalog',
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
        path: '/catalog/:productId/details',
        getHref: (productId) => `/catalog/${productId}/details`,
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

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
        getHref: (productId: string) => `/catalog/${productId}/edit`,
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
        getHref: (productId: string) => `/details/${productId}`,
    },
    reviews: {
        path: '/catalog/:productId/reviews',
        getHref: (productId: string) => `/catalog/${productId}/reviews`,
    },
    wishlist: {
        path: '/wishlist',
    },
    cart: {
        path: '/cart',
    },
    purchase: {
        path: '/purchase',
    },
    purchaseSuccess: {
        path: '/purchase-success',
    },
    orders: {
        path: '/user/orders',
    },
};

export default paths;

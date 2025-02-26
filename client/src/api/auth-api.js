import requester from './request.ts';

const host = import.meta.env.VITE_API_URL;

const endpoints = {
    register: '/users/register',
    login: '/users/login',
    logout: '/users/logout',
};

function register(firstName, lastName, email, password) {
    return requester.post(host + endpoints.register, { firstName, lastName, email, password });
}

function login(email, password) {
    return requester.post(host + endpoints.login, { email, password });
}

function logout() {
    return requester.get(host + endpoints.logout);
}

const authAPI = {
    register,
    login,
    logout,
};

export default authAPI;

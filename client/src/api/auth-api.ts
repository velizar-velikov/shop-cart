import requester from './request.ts';

const host = import.meta.env.VITE_API_URL;

const endpoints = {
    register: '/users/register',
    login: '/users/login',
    logout: '/users/logout',
};

interface User {
    _id: string;
    accessToken: string;
    email: string;
    firstName: string;
    lastName: string;
    _createdOn?: number;
    password?: string;
}

async function register(firstName: string, lastName: string, email: string, password: string): Promise<User> {
    const user: User = await requester.post(host + endpoints.register, { firstName, lastName, email, password });
    return user;
}

async function login(email: string, password: string): Promise<User> {
    const user: User = await requester.post(host + endpoints.login, { email, password });
    return user;
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

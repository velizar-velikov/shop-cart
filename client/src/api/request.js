import { getAccessToken } from '../util/localStorageUtil.js';

function createOptions(method, data, isAdmin) {
    const options = {
        method,
        headers: {},
    };

    const accessToken = getAccessToken();
    if (accessToken) {
        options.headers['X-Authorization'] = accessToken;
    }

    if (isAdmin) {
        options.headers['X-Admin'] = 'X-Admin';
    }

    if (data) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    return options;
}

async function request(method, url, data, isAdmin = false) {
    const options = createOptions(method, data, isAdmin);

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            if (response.status == 403) {
                // unauthorized
                localStorage.removeItem('auth');
            }

            const error = await response.json();
            throw error;
        }

        if (response.status == 204) {
            //no content
            return response;
        }

        return response.json();
    } catch (error) {
        throw error;
    }
}

const requester = {
    get: (url) => request('GET', url),
    post: (url, data) => request('POST', url, data),
    put: (url, data, isAdmin) => request('PUT', url, data, isAdmin),
    delete: (url) => request('DELETE', url),
};

export default requester;

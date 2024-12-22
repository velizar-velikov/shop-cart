import { getAccessToken } from '../util/localStorageUtil.js';

function createOptions(method, data) {
    const options = {
        method,
        headers: {},
    };

    const accessToken = getAccessToken();
    if (accessToken) {
        options.headers['X-Authorization'] = accessToken;
    }

    if (data) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    return options;
}

async function request(method, url, data) {
    const options = createOptions(method, data);

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
    put: (url, data) => request('PUT', url, data),
    delete: (url) => request('DELETE', url),
};

export default requester;

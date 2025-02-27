import { getAccessToken } from '../util/localStorageUtil.ts';

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type Options = {
    method: Method;
    headers: {
        [key: string]: string;
    };
    body?: string;
};

function createOptions(method: Method, data?: object, isAdmin?: boolean): Options {
    const options: Options = {
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

async function request(method: Method, url: string, data?: object, isAdmin?: boolean) {
    const options = createOptions(method, data, isAdmin);

    try {
        const response: Response = await fetch(url, options);

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
    /**
     * Sends a GET request using fetchAPI
     * @param {string} url the url to which the request is sent
     * @returns
     */
    get: (url: string) => request('GET', url),

    /**
     * Sends a POST request using fetchAPI
     * @param {string} url the url to which the request is sent
     * @param {object} data the data to send in the request body
     * @returns
     */
    post: (url: string, data: object) => request('POST', url, data),

    /**
     * Sends a PUT request using fetchAPI
     * @param {string} url the url to which the request is sent
     * @param {object} data the data to send in the request body
     * @param {boolean} isAdmin sends an admin request if set to true
     * @returns
     */
    put: (url: string, data: object, isAdmin?: boolean) => request('PUT', url, data, isAdmin),

    /**
     * Sends a PATCH request using fetchAPI
     * @param {string} url the url to which the request is sent
     * @param {object} data the data to send in the request body
     * @returns
     */
    patch: (url: string, data: object) => request('PATCH', url, data),

    /**
     * Sends a DELETE request using fetchAPI
     * @param {string} url the url to which the request is sent
     * @returns
     */
    delete: (url: string) => request('DELETE', url),
};

export default requester;

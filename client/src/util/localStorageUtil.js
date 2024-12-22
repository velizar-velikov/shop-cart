const item = 'auth';

export function getAccessToken() {
    const userData = JSON.parse(localStorage.getItem(item));

    return userData?.accessToken;
}
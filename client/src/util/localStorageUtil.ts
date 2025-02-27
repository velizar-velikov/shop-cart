const item = 'auth';

export function getAccessToken() {
    const userData = JSON.parse(localStorage.getItem(item) as string);

    return userData?.accessToken;
}

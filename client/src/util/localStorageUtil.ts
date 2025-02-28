const item = 'auth';

export function getAccessToken(): string | null {
    const userData = JSON.parse(localStorage.getItem(item) as string);

    return userData?.accessToken;
}

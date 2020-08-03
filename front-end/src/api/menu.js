import { basePath, apiVersion } from './config';

export function getMenuApi() {
    const url = `${basePath}/${apiVersion}/get-menus`;

    return fetch(url).then(response => response.json())
        .then(result => result)
        .catch(err => err.message);
}
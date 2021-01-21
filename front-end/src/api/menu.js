import { basePath, apiVersion } from './config';

export function getMenuApi() {
    const url = `${basePath}/${apiVersion}/get-menus`;

    return fetch(url).then(response => response.json())
        .then(result => result)
        .catch(err => err.message);
}


//actualizar orden del item en el menu principal.
export function updateMenuApi(token, mainMenuId, menuId, data) {
    const url = `${basePath}/${apiVersion}/update-menu/${menuId}`;

    const params = {
        method: 'PUT',
        headers: {
            "Content-type": "application/json",
            Authorization: token
        },
        body: JSON.stringify(data)
    };
    return fetch(url, params)
        .then(response => response.json())
        .then(result => result.message)
        .catch(err => err);
}

export function addMenuApi(token, data) {
    const url = `${basePath}/${apiVersion}/add-menu`;
    const params = {
      method: 'POST',
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(data),
    };

    return fetch(url, params)
        .then(response => response.json())
        .then(result => result)
        .catch(err => err.message);
}
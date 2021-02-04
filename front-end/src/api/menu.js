import { basePath, apiVersion } from './config';

export function getMenuApi() {
    const url = `${basePath}/${apiVersion}/get-menus`;

    return fetch(url).then(response => response.json())
        .then(result => result)
        .catch(err => err.message);
}


//actualizar orden del item en el menu principal.
export function updateMenuApi(token, action, menuId, data) {
    const url = `${basePath}/${apiVersion}/${action}/${menuId}`;

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

export function addItemtoMenuApi(token, menuId, data) {
    const url = `${basePath}/${apiVersion}/add-item-to-menu/${menuId}`;

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
      method: "POST",
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

export function deleteItemApi(token, menuId, item) {

    const url = `${basePath}/${apiVersion}/delete-item/${menuId}`;
    const params = {
        method: 'PUT',
        headers: {
            "Content-type": "application/json",
            Authorization: token
        },
        body: JSON.stringify(item)
    };

    return fetch(url, params)
        .then(response => response)
        .then(result => result.message)
        .catch(err => err);
}
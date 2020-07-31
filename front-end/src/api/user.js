import { basePath, apiVersion } from './config';

export function signUpApi(data) {
    const url = `${basePath}/${apiVersion}/sign-up`;
    const params = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    };

    return fetch(url, params)
        .then(response => {
            return response.json();
        })
        .then(result => {
            if (result.user) {
                return { status: 200, message: 'user created!'};
            }
            return { status: 404, message: result };
        }).catch(err => {
            return {
                status: 500,
                message: 'Something went wrong user.js:25 +' + err
            };
        })
};

export function signInApi(data) {
    const url = `${basePath}/${apiVersion}/sign-in`;
    const params = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }
    return fetch(url, params)
        .then(response => {
            return response.json();
        })
        .then(result => {
            if (result) {
                return result;
            }
            return { status: 404, message: `Error, api/user.js:47 + ${result}` }
        }).catch(err => {
            return { status: 500, message: 'Something went wrong api/user.js: + ' + err };
        });
}

export function getUserApi(token) {
    const url = `${basePath}/${apiVersion}/users`;

    const params = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization: token
        }
    };
    
    return fetch(url, params)
        .then(response => {
            return response.json();
        })
        .then(result => {
            return result;
        })
        .catch(err => {
            return err.message;
        });
}

export function getUserActiveApi(token, status) {
    const url = `${basePath}/${apiVersion}/users-active?active=${status}`;

    const params = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization: token
        }
    };

    return fetch(url, params)
        .then(response => {
            return response.json();
        })
        .then(result => {
            return result;
        })
        .catch(err => {
            return err.message;
        });
}

export function uploadAvatarApi(token, avatar, userId) {
    const url = `${basePath}/${apiVersion}/upload-avatar/${userId}`;
    const formData = new FormData();
    formData.append("avatar", avatar, avatar.name);

    const params = {
        method: 'PUT',
        body: formData,
        headers: {
            Authorization: token
        }
    };

    return fetch(url, params)
        .then(response => response.json())
        .then(response => response)
        .catch(err => err.message);
}

export function getAvatarApi(avatarName) {
    const url = `${basePath}/${apiVersion}/get-avatar/${avatarName}`;

    return fetch(url)
        .then(response => response.url)
        .catch(err => err.message);
}

export function updateUserApi(token, user, userId) {
    const url = `${basePath}/${apiVersion}/update-user/${userId}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(user),
    };

    return fetch(url, params)
        .then(response => response.json())
        .then(result => result)
        .catch(err => err.message);
}

export function activateUserApi(token, userId, status) {
    const url = `${basePath}/${apiVersion}/activate-user/${userId}`;
    const params = {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
            Authorization: token
        },
        body: JSON.stringify({
            active: status
        })
    };

    return fetch(url, params)
        .then(response => response.json())
        .then(result => result.message)
        .catch(err => err.message);
}

export function deleteUserApi(token, userId) {
    const url = `${basePath}/${apiVersion}/delete-user/${userId}`;

    const params = {
        method: 'DELETE',
        headers: {
            "Content-type": "application/json",
            Authorization: token
        }
    };

    return fetch(url, params)
        .then(response => response.json())
        .then(result => result.message)
        .catch(err => err);
}

export function createNewUser(token, data) {
    const url = `${basePath}/${apiVersion}/create-new-user`;

    const params = {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            Authorization: token,
        },
        body: JSON.stringify(data),
    };

    return fetch(url, params)
        .then((response) => response.json())
        .then((result) => result.message)
        .catch((err) => err.message);
}
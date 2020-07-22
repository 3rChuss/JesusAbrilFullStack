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
                message: err
            };
        })
};

export function signInApi (data) {
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
            return { status: 404, message: `Error, user.js:47 + ${result}` }
        }).catch(err => {
            return { status: 500, message: err };
        });
}
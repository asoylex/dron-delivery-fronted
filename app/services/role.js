import { successAlert, warningAlert } from "../helper/alert";

const pathURL = process.env.NEXT_PUBLIC_PATH_API;


export function getAllRoles() {
    return fetch(pathURL + '/role', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then((res) => res.json())
        .then((data) => {
            return data;
        });
}


export function saveRole(role) {
    return fetch(pathURL + '/role', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(role),
    })
        .then((res) => res.json())
        .then((data) => {
            successAlert('Role saved successfully!', 'success');
            return data;
        })
        .catch((error) => {
            warningAlert('Failed to save role.', 'error');
            throw error;
        });
}
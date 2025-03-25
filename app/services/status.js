import { successAlert, warningAlert } from "../helper/alert";

const pathURL = process.env.NEXT_PUBLIC_PATH_API;

export function getAllStatus() {
    return fetch(pathURL + '/status', {
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

export function saveStatus(status) {

    return fetch(pathURL + '/status', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(status),
    })
        .then((res) => res.json())
        .then((data) => {
            successAlert('Status saved successfully!', 'success');
            return data;
        })
        .catch((error) => {
            warningAlert('Failed to save status.', 'error');
            throw error;
        });
}
import { successAlert, warningAlert } from "../helper/alert";

const pathURL = process.env.NEXT_PUBLIC_PATH_API;

export function getAllProducts() {
    return fetch(pathURL + '/product', {
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


export function saveProduct(product) {
    return fetch(pathURL + '/product', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
    })
        .then((res) => res.json())
        .then((data) => {
            successAlert('Product saved successfully!', 'success');
            return data;
        })
        .catch((error) => {
            warningAlert('Failed to save product.', 'error');
            throw error;
        });
}
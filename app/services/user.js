
import { successAlert, errorAlert } from "../helper/alert";
const pathURL = process.env.NEXT_PUBLIC_PATH_API;


export function registerUser(user) {

    return fetch(pathURL + '/client', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
        .then((res) => res.json())
        .then((data) => {

            console.log(data, "data");
            if (data.accessToken) {
                localStorage.setItem('accessToken', data.accessToken);
            }
            return data;
        });
}

export async function createCredential(email, password) {
    try {
        const role = 2;
        const response = await fetch(pathURL + '/user', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, role }),
        });

        if (response.status === 404) {
            const errorData = await response.json();
            errorAlert('Error creating credential: ' + errorData.message);
            throw new Error(errorData.message);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        errorAlert('Error creating credential: ' + error.message);
        throw error;
    }
}

export function createCredentialAndRegisterUser(user) {
    return createCredential(user.email, user.password)
        .then((credentialData) => {

            console.log(credentialData, "credentialData");
            if (credentialData && credentialData.id) {

                user = {
                    ...user,
                    user: {
                        id: credentialData.id,
                    },
                };

                return registerUser(user);
            } else {
                throw new Error('Failed to create credential');
            }
        })
        .then((registerData) => {
            if (registerData && registerData.accessToken) {
                successAlert('User registered successfully');
            }
            return registerData;
        })
        .catch((error) => {
            errorAlert('Error: ' + error.message);
            throw error;
        });
}



export function getClients() {
    return fetch(pathURL + '/client', {
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

export function updateClient(client, id) {


    const data = {
        name: client.name,
        username: client.username,
        phone: client.phone,
        address: client.address,
        credits: client.credits,
    }

    return fetch(`${pathURL}/client/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((data) => {
            successAlert('Client updated successfully!', 'success');
            return data;
        })
        .catch((error) => {
            errorAlert('Failed to update client.', 'error');
            throw error;
        });
}


export function setLatLong({ userId, lat, long }) {
    return fetch(pathURL + '/client/' + userId, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lat, long }),
    })
        .then((res) => res.json())
        .then((data) => {
            return data;
        });
}

export function getClientById(id) {
    return fetch(pathURL + '/client/' + id, {
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


export function discountCredit({ id, discount }) {

    console.log(id, discount, "id, discount");
    return getClientById(id)
        .then((client) => {
            if (!client || !client.credits) {
                throw new Error('Client not found or credits not available');
            }
            const updatedCredits = client.credits - discount;

            return updateClient({ credits: updatedCredits }, id);
        })
        .then((updatedClient) => {
            successAlert('Credit discounted successfully!', 'success');
            return updatedClient;
        })
        .catch((error) => {
            errorAlert('Failed to discount credit.', 'error');
            throw error;
        });
}
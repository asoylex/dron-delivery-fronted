import { errorAlert, successAlert } from '../helper/alert';



const pathURL = process.env.NEXT_PUBLIC_PATH_API;



export function getAllStations() {
    return fetch(pathURL + '/station', {
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


export function saveStation(station) {

    console.log(station);
    return fetch(pathURL + '/station', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(station),
    })
        .then((res) => res.json())
        .then((data) => {
            successAlert('Station saved successfully!', 'success');
            return data;
        })
        .catch((error) => {
            errorAlert('Failed to save station.', 'error');
            throw error;
        });
}
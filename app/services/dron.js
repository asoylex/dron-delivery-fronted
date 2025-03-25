import { successAlert, warningAlert } from "../helper/alert";

const pathURL = process.env.NEXT_PUBLIC_PATH_API;


export function getAllDrones() {
    return fetch(pathURL + '/drone', {
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

export function saveDrone(drone) {

    console.log(drone);
    return fetch(pathURL + '/drone', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: drone.model,
            speed_km_h: drone.speed_km_h,
            max_range_km: 7,
            station: drone.station,
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            successAlert('Drone saved successfully!', 'success');
            return data;
        })
        .catch((error) => {
            warningAlert('Failed to save drone.', 'error');
            throw error;
        });
}
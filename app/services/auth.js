

const pathURL = process.env.NEXT_PUBLIC_PATH_API;

export function login(email, password) {

    return fetch(pathURL + '/auth/login', {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.accessToken) {
                localStorage.setItem('accessToken', data.accessToken);
            }
            return data;
        });
}
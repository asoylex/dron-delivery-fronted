import { successAlert, warningAlert } from "../helper/alert";
const pathURL = process.env.NEXT_PUBLIC_PATH_API;



export function saveOrder(order) {
    const data = {

        userId: order.userId,
        statusId: order.statusId,
    }

    console.log(data, order);
    return fetch(pathURL + '/order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((data) => {
            successAlert('Order saved successfully!', 'success');
            return data;
        })
        .catch((error) => {
            warningAlert('Failed to save order.', 'error');
            throw error;
        });
}

export function addArticles(articles) {

    articles = articles.products;

    console.log(articles, "articles");
    const promises = articles.map((article) => {
        const data = {
            article_id: article.id,
            quantity: article.quantity
        };

        return fetch(pathURL + '/article', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => {
                successAlert(`Article ${article.id} added successfully!`, 'success');
                return data;
            })
            .catch((error) => {
                warningAlert(`Failed to add article ${article.id}.`, 'error');
                throw error;
            });
    });

    return Promise.all(promises);
}



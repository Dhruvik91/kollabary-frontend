const axios = require('axios');

const INDEX_NOW_KEY = 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6';
const HOST = 'www.kollabary.com';
const URL_LIST = [
    `https://${HOST}/`,
    `https://${HOST}/privacy`,
    `https://${HOST}/terms`,
];

async function submitToIndexNow() {
    try {
        const response = await axios.post('https://api.indexnow.org/indexnow', {
            host: HOST,
            key: INDEX_NOW_KEY,
            keyLocation: `https://${HOST}/${INDEX_NOW_KEY}.txt`,
            urlList: URL_LIST
        });
        console.log('IndexNow submission successful:', response.data);
    } catch (error) {
        console.error('IndexNow submission failed:', error.response ? error.response.data : error.message);
    }
}

submitToIndexNow();

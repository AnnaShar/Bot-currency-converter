import fetch from 'node-fetch';

const getData = async (url) => {
    const response = await fetch(url, {
        method: 'GET'
    });

    if (response.status !== 200) {
        throw new Error(`Could not reach ${url}.`);
    }

    return await response.json();
};

export default {
    getData
}
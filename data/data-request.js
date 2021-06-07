import fetch from 'node-fetch';

const getData = async (url) => {
    try {
        const response = await fetch(url, {
            method: 'GET'
        });
        const data = await response.json();
        return data;
    }
    catch (e) {
        throw new Error(`Could not reach ${url}.`);
    }
};

export default {
    getData: getData
}
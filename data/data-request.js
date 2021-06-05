import config from '../config.js';
import dataParser from './currency-parser.js';

import fetch from 'node-fetch';

const getData = async () => {
    const response = await fetch(config.urls.currencyRates, {
        method: 'GET'
        //TODO check Accept: 'JSON'
    });
    const data = await response.json();

    return dataParser.parse(data);
};

export default {
    getData: getData
}
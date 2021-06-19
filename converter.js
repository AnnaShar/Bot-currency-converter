import currenciesInfo from './currencies-info.js';

const convertCurrency = (value, {rate, from, to}) => {
    const result = (value * rate).toFixed(2);
    return `${value} ${currenciesInfo[from].symbol} = ${result} ${currenciesInfo[to].symbol}`;
};

export default {
    convertCurrency
}
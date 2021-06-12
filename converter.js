import currenciesInfo from "./currencies-info.js";

const convertCurrency = (value, conversion)=>{
    const rate = conversion.rate;
    const result = (value * rate).toFixed(2);
    const from = currenciesInfo[conversion.from];
    const to = currenciesInfo[conversion.to];
    return `${value} ${from.symbol} = ${result} ${to.symbol}`;
};

export default {
    convertCurrency
}
const parse = (jsonData) => {
    const currenciesArrays = jsonData.securities.data;
    return parseCurrenciesToObject(currenciesArrays);
};

const parseCurrenciesToObject = (currenciesArray) => {
    const currenciesObj = {};
    try {
        currenciesArray.forEach((currency) => {
            const security = currency[2];
            currenciesObj[security] = {
                from: security.split('/')[0],
                to: security.split('/')[1],
                date: currency[0],
                time: currency[1],
                rate: currency[3]
            };
        });
        return currenciesObj;
    } catch (e) {
        throw new Error('Could not parse. Wrong format of data.');
    }
};

export default {
    parse: parse
}
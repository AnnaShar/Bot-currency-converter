const parse = (jsonData) => {
    const currenciesArrays = jsonData.securities.data;
    return parseCurrenciesToObject(currenciesArrays);
};

const parseCurrenciesToObject = (currenciesArray) => {
    const currenciesObj = {};
    try {
        currenciesArray.forEach((currency) => {
            const security = currency[2];

            const securityFrom = security.split('/')[0];
            const securityTo = security.split('/')[1];

            currenciesObj[security] = {
                from: securityFrom,
                to: securityTo,
                date: currency[0],
                time: currency[1],
                rate: currency[3],
            };

            const inverseSecurity = `${securityTo}/${securityFrom}`;
            currenciesObj[inverseSecurity] = {
                from: securityTo,
                to: securityFrom,
                date: currency[0],
                time: currency[1],
                rate: parseFloat((1 /currency[3]).toFixed(4)),
            };
        });
        return currenciesObj;
    } catch (e) {
        throw new Error('Could not parse. Wrong format of data.');
    }
};

export default {
    parse
}
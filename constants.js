import {readFile} from "./utils/file-reader-writer.js";
import config from "./config.js";

let currencyRates = null;

const getCurrencyRates = () => {
    if (!currencyRates) {
        currencyRates = readFile(config.files.dataStorage.currency);
    }
    return currencyRates;
};

const getConversionsList = () => {
    const rates = getCurrencyRates();
    const availableConversions = Object.values(rates);
    let conversionsList = [];
    availableConversions.forEach((conversion) => {
        const from = conversion.from;
        const to = conversion.to;
        const conversionName = `${from}_to_${to}`;
        conversionsList.push(conversionName);
    });
    return conversionsList;
};

const getLanguageList = () => {
    return ['eng', 'ru'];
};

export default {
    getLanguageList,
    getConversionsList,
    getCurrencyRates
}
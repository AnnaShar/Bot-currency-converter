import {readFile} from "./utils/file-reader-writer.js";
import config from "./config.js";
import responseTexts from "./response-texts.js";
import commands from "./commands.js";
import currenciesInfo from './currencies-info.js';

let language = 'eng';
let name = null;
let currentConversion = null;
let currencyRates = null;

const getCurrencyRates = () => {
    if (!currencyRates) {
        currencyRates = readFile(config.files.dataStorage.currency);
    }
    return currencyRates;
};

const start = (userInfo) => {
    userInfo.first_name ? name = userInfo.first_name : name = null;
    language = userInfo.language_code;

    let response = `${responseTexts.hello[language]}${name ? ', ' + name : ''}!`;
    response += responseTexts.start[language];

    return response;
};

const help = () => {
};

const conversions = () => {
    let response = commands.conversions.text[language];
    const conversionsList = getConversionsList();
    conversionsList.forEach((conversion) => {
        response += `/${conversion}\n`;
    });
    return response;
};

const currencies = () => {
    let response = '';
    currenciesInfo.forEach(currency=>{
       response += `${currency.code} - ${currency.name[language]} (${currency.symbol})\n`;
    });
    return response;
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

export default {
    start: start,
    help: help,
    conversions: conversions,
    getConversionsList: getConversionsList,
    currencies:currencies
}
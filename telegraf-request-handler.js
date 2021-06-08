import commands from "./commands.js";
import currenciesInfo from './currencies-info.js';
import constants from "./constants.js";
import conversionParser from './conversion-parser.js';

//TODO solve problem with origin and custom language
let language = 'eng';
let customLanguage = false;
let name = null;
let currentConversion = null;

const start = (userInfo) => {
    if (userInfo.first_name) {
        name = userInfo.first_name;
    }

    const availableLanguages = constants.getLanguageList();
    if (availableLanguages.includes(userInfo.language_code)) {
        language = userInfo.language_code;
    }

    let response = `${commands.start.hello[language]}${name ? ', ' + name : ''}!\n`;
    response += commands.start.text[language];

    return response;
};

const help = () => {
    let response = commands.help.text[language];
    const customCommands = commands.customCommands;
    customCommands.forEach(command => {
        response += `${commands[command].name} - ${commands[command].description[language]}\n`;
    });
    return response;
};

const conversions = () => {
    let response = commands.conversions.text[language] + '\n';
    response += makeConversionsListAsCommands();
    return response;
};

const makeConversionsListAsCommands = () => {
    let list = '';
    const conversionsList = constants.getConversionsList();
    conversionsList.forEach((conversion) => {
        list += `/${conversion}\n`;
    });
    return list;
};

const currencies = () => {
    let response = '';
    currenciesInfo.forEach(currency => {
        response += `${currency.code} - ${currency.name[language]} (${currency.symbol})\n`;
    });
    return response;
};

const languages = () => {
    const languageList = constants.getLanguageList();
    let response = `${commands.language.text[language]}\n`;
    languageList.forEach(language => {
        response += `/${language}\n`;
    });
    return response;
};

const changeLanguage = (language) => {
    //TODO check this
    this.language = language;
    return commands.changeLanguage.text[language];
};

const saveConversion = (conversion) => {
    const conversionName = conversionParser.parse(conversion);
    currentConversion = constants.getCurrencyRates()[conversionName];
    return commands.saveConversion.text[language] + conversion;
};

const convert = (userNumber) => {
    let response = '';
    if (!currentConversion) {
        response = commands.convert.failedConversion[language];
        response += makeConversionsListAsCommands();
    }

    const number = Math.abs(parseFloat(userNumber));
    if (isNaN(number)) {
        response += commands.convert.invalidNumber[language];
    } else {
        const rate = currentConversion.rate;
        const result = number * rate.toFixed(2);
        //TODO get back commit about array structure
        const from = currenciesInfo[currentConversion.from];
        const to = currenciesInfo[currentConversion.to];
        response += `${number}${from.symbol} = ${result}${to.symbol}`;
    }
    return response;
};

export default {
    start: start,
    help: help,
    conversions: conversions,
    currencies: currencies,
    languages: languages,
    changeLanguage: changeLanguage,
    saveConversion: saveConversion,
    convert: convert
}
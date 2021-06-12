import commands from "./constants/commands.js";
import currenciesInfo from './currencies-info.js';
import constants from "./constants/constants.js";
import conversionParser from './conversion-parser.js';
import userInfoUtils from './user-info.js';
import converter from './converter.js';

const start = (userInfo) => {
    let user = userInfoUtils.getUserInfo(userInfo.id);
    if(!user.id) {
        user = userInfoUtils.saveUserInfo(userInfo.id, userInfo);
    }
    let response = `${commands.start.hello[user.language]}${user.firstName ? ', ' + user.firstName : ''}!\n`;
    response += commands.start.text[user.language];

    return response;
};

const help = (userID) => {
    const user = userInfoUtils.getUserInfo(userID);

    let response = commands.help.text[user.language];
    const customCommands = commands.customCommands;
    customCommands.forEach(command => {
        response += `${commands[command].name} - ${commands[command].description[user.language]}\n`;
    });
    return response;
};

const conversions = (userID) => {
    const user = userInfoUtils.getUserInfo(userID);

    let response = commands.conversions.text[user.language] + '\n';
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

const currencies = (userID) => {
    const user = userInfoUtils.getUserInfo(userID);

    let response = '';
    Object.values(currenciesInfo).forEach(currency => {
        response += `${currency.code} - ${currency.name[user.language]} (${currency.symbol})\n`;
    });
    return response;
};

const languages = (userID) => {
    const user = userInfoUtils.getUserInfo(userID);

    const languageList = constants.getLanguageList();
    let response = `${commands.language.text[user.language]}\n`;
    languageList.forEach(language => {
        response += `/${language}\n`;
    });
    return response;
};

const changeLanguage = (userID, language) => {
    const user = userInfoUtils.getUserInfo(userID);
    userInfoUtils.updateUserInfo(user.id, {language: language});
    return commands.changeLanguage.text[language];
};

const saveConversion = (userID, conversion) => {
    const conversionName = conversionParser.parse(conversion);
    const currentConversion = constants.getCurrencyRates()[conversionName];

    const user = userInfoUtils.getUserInfo(userID);
    userInfoUtils.updateUserInfo(user.id, {conversion: currentConversion});

    return `${commands.saveConversion.text[user.language]} (${conversion})`;
};

const convert = (userID, userNumber) => {
    const user = userInfoUtils.getUserInfo(userID);

    let response = '';
    if (!user.conversion) {
        response = commands.convert.failedConversion[user.language];
        response += makeConversionsListAsCommands();
        return response;
    }

    const number = Math.abs(parseFloat(userNumber));
    if (isNaN(number)) {
        response += commands.convert.invalidNumber[user.language];
    } else {
        response += converter.convertCurrency(number, user.conversion);
    }
    return response;
};

export default {
    start,
    help,
    conversions,
    currencies,
    languages,
    changeLanguage,
    saveConversion,
    convert
}
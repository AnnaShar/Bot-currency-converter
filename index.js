import {Telegraf} from 'telegraf';

import keys from './keys.js';
import telegrafResponse from './telegraf-request-handler.js';
import constants from './constants/constants.js';
import dataUpdateSynchronizer from './data/data-synchronizer.js';

const bot = new Telegraf(keys.telegramAPIKey);

bot.start(ctx => ctx.reply(
    telegrafResponse.start(ctx.update.message.from)
));

bot.help(ctx => {
    const userID = ctx.update.message.from.id;
    ctx.reply(telegrafResponse.help(userID));
});

bot.command('conversions', ctx => {
    const userID = ctx.update.message.from.id;
    ctx.reply(telegrafResponse.conversions(userID));
});

bot.command('currencies', ctx => {
    const userID = ctx.update.message.from.id;
    ctx.reply(telegrafResponse.currencies(userID));
});

bot.command('language', ctx => {
    const userID = ctx.update.message.from.id;
    ctx.reply(telegrafResponse.languages(userID));
});

const languageList = constants.getLanguageList();
bot.command(languageList, ctx => {
    const userID = ctx.update.message.from.id;
    const language = ctx.update.message.text.split('/')[1];
    ctx.reply(telegrafResponse.changeLanguage(userID, language));
});


const conversions = constants.getConversionsList();
bot.command(conversions, ctx => {
    const userID = ctx.update.message.from.id;
    const conversion = ctx.update.message.text.split('/')[1];
    ctx.reply(telegrafResponse.saveConversion(userID, conversion));
});

bot.on('text', ctx => {
    const userID = ctx.update.message.from.id;
    const userText = ctx.message.text;
    ctx.reply(telegrafResponse.convert(userID, userText));
});

bot.launch();
dataUpdateSynchronizer.start();

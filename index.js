import keys from './keys.js';
import telegrafResponse from './telegraf-request-handler.js';
import {Telegraf} from 'telegraf';
import constants from "./constants.js";

const bot = new Telegraf(keys.telegramAPIKey);

bot.start(ctx => ctx.reply(
    telegrafResponse.start(ctx.update.message.from)
));

bot.help(ctx => ctx.reply(
    telegrafResponse.help()
));

bot.command('conversions', ctx => ctx.reply(
    telegrafResponse.conversions()
));

bot.command('currencies', ctx => ctx.reply(
    telegrafResponse.currencies()
));

bot.command('languages', ctx => ctx.reply(
    telegrafResponse.languages()
));

const languageList = constants.getLanguageList();

bot.command(languageList, ctx => {
    const language = ctx.update.message.text.split('/')[1];
    ctx.reply(telegrafResponse.changeLanguage(language));
});


const conversions = constants.getConversionsList();

bot.command(conversions, ctx => {
    const conversion = ctx.update.message.text.split('/')[1];
    ctx.reply(telegrafResponse.saveConversion(conversion));
});

bot.on('text', ctx => {
        const userText = ctx.message.text;
        ctx.reply(telegrafResponse.convert(userText));
    }
);

bot.launch();
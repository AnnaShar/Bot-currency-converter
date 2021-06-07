import keys from './keys.js';
import telegrafResponse from './telegraf-request-handler.js';
import {Telegraf} from 'telegraf';
const bot = new Telegraf(keys.telegramAPIKey);

bot.start( ctx => ctx.reply(
    console.log(ctx)
));

// bot.help((ctx) => ctx.reply(`А тут будет полный список валют :)
// ${constants.currencyList.keys().toString()}
// `));
//
// bot.on('text', async (ctx) => {
//     try {
//         const userText = ctx.message.text;
//
//         let value = userText.split(' ')[0];
//         let currency = userText.split(' ')[1];
//         let defaultMode = false;
//
//         if(!currency){ // || !constants.currencyList.has(currency)) {
//             defaultMode = true;
//             currency = 'RUB' ;
//         }
//         // if(typeof value!== 'number' || value<0) {
//         //     defaultMode = true;
//         //     value = 1;
//         // }
//         converter.convert(value, currency).then(response => {
//             let symbol = currencySymbols[currency];
//             symbol = symbol ? symbol : currency;
//             console.log(response);
//             console.log(symbol);
//             ctx.reply(parseFloat(response).toFixed(2) +' '+ symbol);
//         });
//
//     } catch(e) {
//         ctx.reply('Непрааавильно /help');
//     }
// });

bot.launch();
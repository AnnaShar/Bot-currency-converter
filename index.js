import bot from './telegraf-bot-commands.js';
import dataUpdateSynchronizer from './data/data-synchronizer.js';

bot.launch();
dataUpdateSynchronizer.start();

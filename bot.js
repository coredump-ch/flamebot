'use strict';

const config = require('./config.js');
const oneLiners = require('./one_liners.js');
const replies = require('./replies.js');
const FlameBot = require('./FlameBot.js');
const TelegramBot = require('node-telegram-bot-api');

const flameRate = 0.02;
const stickerRate = 0.05;

const telegram = new TelegramBot(config.token, { polling: true });
const flameBot = new FlameBot(flameRate, stickerRate, oneLiners, replies, telegram);
flameBot.start();

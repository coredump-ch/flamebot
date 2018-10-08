// Read config
import * as config from './config';

// Main logic
import {FlameBot} from './FlameBot';

// Telegram integration
import * as TelegramBot from 'node-telegram-bot-api';

const flameRate = 0.02;
const telegram = new TelegramBot(config.token, { polling: true });
const flameBot = new FlameBot(flameRate, telegram);

flameBot.start();

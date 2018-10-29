// Main logic
import {MattermostFlameBot} from './mattermost';
import {TelegramFlameBot} from './telegram';

// Telegram integration
import * as TelegramBot from 'node-telegram-bot-api';

// Dotenv
import * as dotenv from 'dotenv';
dotenv.config();

// Configuration
const flameRate = 0.02;
const port = parseInt(process.env.PORT || '8000', 10);

// Tokens
const telegramToken = process.env.TELEGRAM_TOKEN || '';
const mattermostToken = process.env.MATTERMOST_TOKEN || '';

if (telegramToken.length === 0) {
  console.error('Please set TELEGRAM_TOKEN env var');
  process.exit(1);
}
if (mattermostToken.length === 0) {
  console.error('Please set MATTERMOST_TOKEN env var');
  process.exit(1);
}

const telegram = new TelegramBot(telegramToken, { polling: true });
const telegramFlameBot = new TelegramFlameBot(flameRate, telegram);
const mattermostFlameBot = new MattermostFlameBot(flameRate, port, mattermostToken);

telegramFlameBot.start();
mattermostFlameBot.start();

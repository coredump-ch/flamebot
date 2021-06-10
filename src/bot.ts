// Main logic
import {MattermostFlameBot} from './services/mattermost';
import {TelegramFlameBot} from './services/telegram';

// Telegram integration
import * as TelegramBot from 'node-telegram-bot-api';

// Dotenv
import * as dotenv from 'dotenv';
dotenv.config();

// Configuration
const telegramToken = process.env.TELEGRAM_TOKEN || '';
const mattermostToken = process.env.MATTERMOST_TOKEN || '';
const port = parseInt(process.env.FLAMEBOT_PORT || '8000', 10);
const flameRate = parseFloat(process.env.FLAMEBOT_FLAME_RATE || '0.03');
const debug = process.env.FLAMEBOT_DEBUG === 'true';

// Validate config
if (flameRate < 0 || flameRate > 1) {
  console.error('Flame rate must be between 0 and 1!');
  process.exit(1);
}
if (telegramToken.length === 0) {
  console.error('Please set TELEGRAM_TOKEN env var');
  process.exit(1);
}
if (mattermostToken.length === 0) {
  console.error('Please set MATTERMOST_TOKEN env var');
  process.exit(1);
}

const telegram = new TelegramBot(telegramToken, {polling: true});
const telegramFlameBot = new TelegramFlameBot(flameRate, debug, telegram);
const mattermostFlameBot = new MattermostFlameBot(
  flameRate,
  port,
  debug,
  mattermostToken,
);

if (debug) {
  console.debug('Enabled debug mode');
}

telegramFlameBot.start();
mattermostFlameBot.start();

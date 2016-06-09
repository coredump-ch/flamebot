'use strict';

const config = require('./config.js');
const oneLiners = require('./one_liners.js');
const replies = require('./replies.js');

const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(config.token, { polling: true });

const flameRate = 0.02;
const stickerRate = 0.05;
let botName;

bot.getMe().done((res) => {
  botName = res.username;
});

/**
 * Replies with an insult
 *
 * @param {object} message - The message to reply to
 * @param {object} user - The user to insult
 */
function replyInsult(message, user) {
  if (Math.random() > stickerRate) {
    const insult = oneLiners.getRandomInsult(user.first_name);
    replyText(insult, message);
  } else {
    const sticker = oneLiners.getRandomSticker();
    bot.sendSticker(message.chat.id, sticker, { reply_to_message_id: message.message_id });
  }
}

/**
 * Replies text to a message
 *
 * @param {string} text - The text to send
 * @param {object} message - The message to reply to
 */
function replyText(text, message) {
  bot.sendMessage(message.chat.id, text, { reply_to_message_id: message.message_id });
}

/**
 * Handles new messages and replies with insults if necessary
 *
 * @param {object} message - The message to reply to
 */
function handleMessage(message) {
  if (botName === undefined) {
    setTimeout(handleMessage.bind(undefined, message), 3000);

    return;
  }

  // To find a sticker id: Send it to telegram-flame-bot in private chat
  if (message.chat.type === 'private' && message.sticker) {
    replyText('Sticker file_id: ' + message.sticker.file_id, message);
  }

  if (message.new_chat_participant) {
    replyInsult(message, message.new_chat_participant);
  } else if (message.text) {
    const repliesMatch = replies.search(message.text);
    if (repliesMatch) {
      replyText(repliesMatch, message);
    } else if (/mue?tt?(er|i)/i.test(message.text)) {
      replyText('HANI MUETTER GHÖRT??!', message);
    } else if (new RegExp(botName, 'i').test(message.text) || Math.random() < flameRate) {
      replyInsult(message, message.from);
    }
  } else if (Math.random() < flameRate) {
    replyInsult(message, message.from);
  }
}

bot.on('message', (message) => {
  handleMessage(message);
});

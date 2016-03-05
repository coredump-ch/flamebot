'use strict';

var config = require('./config.js');
var oneLiners = require('./one_liners.js');
var replies = require('./replies.js');

var TelegramBot = require('node-telegram-bot-api');

var bot = new TelegramBot(config.token, {polling: true});

/**
 * Replies with an insult
 *
 * @param {object} message - The message to reply to
 * @param {object} user - The user to insult
 */
function replyInsult(message, user) {
  if (Math.random() * 20 > 1) {
    let insult = oneLiners.getRandomInsult(user.first_name);
    replyText(insult, message);
  } else {
    var sticker = oneLiners.getRandomSticker();
    bot.sendSticker(message.chat.id, sticker, {reply_to_message_id: message.message_id});
  }
}

var botName;
bot.getMe().done(function(res) {
  botName = res.username;
});

/**
 * Replies text to a message
 *
 * @param {string} text - The text to send
 * @param {object} message - The message to reply to
 */
function replyText(text, message) {
  bot.sendMessage(message.chat.id, text, {reply_to_message_id: message.message_id});
}

/**
 * Handles new messages and replies with insults if necessary
 *
 * @param {object} message - The message to reply to
 */
function handleMessage(message) {
  if (botName === undefined) {
    setTimeout(function() {
      handleMessage(message);
    }, 3000);

    return;
  }

  // To find a sticker id: Send it to telegram-flame-bot in private chat
  if (message.chat.type === 'private' && message.sticker) {
    replyText('Sticker file_id: ' + message.sticker.file_id, message);
  }

  if (message.new_chat_participant) {
    replyInsult(message, message.new_chat_participant);
  } else if (message.text) {
    var repliesMatch = replies.search(message.text);
    if (repliesMatch) {
      replyText(repliesMatch, message);
    } else if (/mue?tt?(er|i)/i.test(message.text)) {
      replyText('HANI MUETTER GHÖRT??!', message);
    } else if (new RegExp(botName, 'i').test(message.text) || Math.random() * 50 < 1) {
      replyInsult(message, message.from);
    }
  } else if (Math.random() * 50 < 1) {
    replyInsult(message, message.from);
  }
}

bot.on('message', function(message) {
  handleMessage(message);
});

var config = require('./config.js');

var TelegramBot = require('node-telegram-bot-api');

var bot = new TelegramBot(config.token, {polling: true});

/**
 * Returns an insult
 * @param {object} message - The message to reply to
 * @param {object} user - The user to insult
 * @returns {string} The insult
 */
function getInsult(message, user) {
  var u = user.first_name;
  var insults = [
    'You fight like a dairy farmer.',
    'You fight like a cow.',
    'So you want to be a pirate, eh? You look more like a flooring inspector.',
    u + '? That’s the most ridiculous name I’ve ever heard!',
    'You’ve got to help me! I’m a victim of society!',
    'Let’s face it, ' + u + '. You are an evil, foul-smelling, vile, codependent villain and that’s just not what I’m looking for in a romantic relationship right now.',
    'I-- --am your brother!',
    u + ', stop babbling.',
    'You’re about as fearsome as a doorstop.',
    'Oh, so your parents were expecting a girl.',
    'Arrgh! Math be hard, let’s go shoppin’!',
    'Life is like pillaging a trading vessel bound, ' + u + '... Ya never know what you’re gonna get.',
    'Ahh, the middle finger, the most communicative of fingers.',
    'Well… you fight like a cow!',
    'Iron Maiden?! Excellent! ... I have no idea why I just said that.',
    'So you’re going to die... again... wonderful!',
    'Sitting in a dark room with a lava lamp and thinking you’re in heaven?',
    'No no, I’m not questioning your professionalism, it’s just that I don’ even the meaning -',
    'Is it over? ...Hello? ...Did I win?'
  ];
  return insults[Math.floor(Math.random() * insults.length)];
}

/**
 * Writes an insult to the chat
 * @param {object} message - The message to reply to
 * @param {object=} user - The user to insult
 */
function writeInsult(message, user) {
  user = user || message.from;
  bot.sendMessage(message.chat.id, getInsult(message, user), {'reply_to_message_id': message.message_id});
}

bot.onText(/@CoredumpFlameBot/, function(message, match) {
  writeInsult(message);
});

bot.on('message', function(message) {
  if (message.new_chat_participant) {
    writeInsult(message, message.new_chat_participant);
  }
  
  if (Math.random() * 30 > 1 || message.text && /@CoredumpFlameBot/.test(message.text)) {
    return;
  }
  
  writeInsult(message);
});

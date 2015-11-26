var config = require('./config.js');
var monkey_island = require('./monkey_island.js');

var TelegramBot = require('node-telegram-bot-api');

var bot = new TelegramBot(config.token, {polling: true});

/**
 * Returns an insult
 * @param {object} message - The message to reply to
 * @param {object} user - The user to insult
 * @returns {string} The insult
 */
 var getInsult = (function() {
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
    'Is it over? ...Hello? ...Did I win?',
    'Aha, mal wieder in der Nase gebohrt, wie?',
    'Willst du mich mit deinem Geschwafel ermüden?',
    'Zu Schade, dass DAS überhaupt niemanden interessiert.',
    'Sollt’ ich in deiner Nähe sterben, möcht’ ich, daß man mich desinfiziert!',
    'Bist du das? Es riecht hier so nach Jauche und Dung!',
    'Ist der Blick in den Spiegel für Dich jeden Tag nicht eine Erniedrigung?',
    'Du hast soviel Sexappeal wie ein Croupier.',
    'Dein Geplänkel kommt nicht richtig in Schwung!',
    'Wurdest du damals von einem Schwein adoptiert?',
    'Das ich nicht lache, ' + u,
    'Deine Mutter trägt ein Toupet.',
    'Dein Geruch allein reicht aus und ich wär’ kollabiert!',
    'Ich glaub’, es gibt für dich noch eine Stelle beim Varieté.',
    'Für dein Gesicht bekommst du ’ne Begnadigung!',
    'unglaublich erbärmlich sag ich',
    'das sind große Worte für ' + u + ' ohne Grips',
    'Dini Mueter.',
  ];
  return function(message, user) {
    var u = user.first_name;
    
    return insults[Math.floor(Math.random() * insults.length)];
  }
})();

/**
 * Replies to a message
 * @param {string} text - The text to send
 * @param {object} message - The message to reply to
 */
function replyText(text, message) {
  bot.sendMessage(message.chat.id, text, {'reply_to_message_id': message.message_id});
}

bot.on('message', function(message) {
  if (message.new_chat_participant) {
    replyText(getInsult(message, message.new_chat_participant), message);
  } else if (message.text) {
    var monkey_island_match = monkey_island.search(message.text);
    if (monkey_island_match) {
      replyText(monkey_island_match, message);
    } else if (/CoredumpFlameBot/.test(message.text) || Math.random() * 30 < 1) {
      replyText(getInsult(message, message.from), message);
    }
  } else if (Math.random() * 30 < 1) {
    replyText(getInsult(message, message.from), message);
  }
});

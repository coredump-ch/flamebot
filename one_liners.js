'use strict';

var insults = [
  // Inspired by Monkey island
  'You fight like a dairy farmer, %u%.',
  'So you want to be a pirate, %u%, eh? You look more like a flooring inspector.',
  '%u%? That’s the most ridiculous name I’ve ever heard!',
  'You’ve got to help me! I’m a victim of society, %u%!',
  'Let’s face it, %u%. You are an evil, foul-smelling, vile, codependent villain and that’s just not what I’m looking for in a romantic relationship right now.',
  'I-- --am your brother, %u%!',
  '%u%, stop babbling.',
  'You’re about as fearsome as a doorstop, %u%.',
  'Oh, so your parents were expecting a girl, %u%.',
  'Life is like pillaging a trading vessel bound, %u% … Ya never know what you’re gonna get.',
  'To you the middle finger, the most communicative of fingers, %u%.',
  'Well … you fight like a cow, %u%!',
  'Iron Maiden?! Excellent! … I have no idea why I just said that, %u%.',
  'So you’re going to die … again, %u% … wonderful!',
  'Sitting in a dark room with a lava lamp and thinking you’re in heaven, %u%?',
  'No no, I’m not questioning your professionalism, %u% … it’s just that I don’ even the meaning -',
  'Is it over? … Hello? … %u%? … Did I win?',
  'Aha, mal wieder in der Nase gebohrt, wie, %u%?',
  'Willst du mich mit deinem Geschwafel ermüden, %u%?',
  'Zu Schade, dass DAS überhaupt niemanden interessiert, %u%.',
  'Sollt’ ich in deiner Nähe sterben, , %u%, möcht’ ich, daß man mich desinfiziert!',
  'Bist du das, %u%? Es riecht hier so nach Jauche und Dung!',
  'Ist der Blick in den Spiegel für Dich jeden Tag nicht eine Erniedrigung, %u%?',
  'Du hast soviel Sexappeal wie ein Croupier, %u%.',
  'Dein Geplänkel kommt nicht richtig in Schwung, %u%!',
  'Wurdest du damals von einem Schwein adoptiert, %u%?',
  'Das ich nicht lache, %u%',
  'Deine Mutter trägt ein Toupet, %u%.',
  'Dein Geruch allein reicht aus und ich wär’ kollabiert, %u%!',
  'Ich glaub’, es gibt für dich noch eine Stelle beim Varieté, %u%.',
  'Für dein Gesicht bekommst du ’ne Begnadigung, %u%!',
  'unglaublich erbärmlich sag ich, %u%.',
  'das sind große Worte für %u% ohne Grips',
  'Du kämpfst wie ein dummer Bauer, %u%.',
  'Ich kenne einige Affen, die haben mehr drauf als %u%.',
  'Du hast die Manieren eines Bettlers, %u%.',
  'Mein Schwert wird %u% aufspießen wie einen Schaschlik!',
  'Mit meinem Taschentuch werde ich dein Blut aufwischen, %u%.',
  'Ich hatte mal einen Hund, der war klüger als du, %u%.',
  'Du bist kein echter Konversationspartner für mein geschultes Hirn, %u%!',
  'Trägst du immer noch Windeln, %u%?',
  'An deiner Stelle würde ich Telegram verlassen, %u%!',
  'Jeder hier kennt dich doch als unerfahrenen Dummkopf, %u%!',
  'Wirst du laut Testament morgen eingeäschert oder einbalsamiert, %u%?',
  'Himmel bewahre! Für einen Hintern wäre dein Gesicht eine Beleidigung, %u%!',
  'Du bist so häßlich wie ein Affe in einem Negligé, %u%!',
  'Warst Du schon immer so häßlich oder bist du mutiert, %u%?',
  'Haben sich deine Eltern nach deiner Geburt sterilisiert, %u%?',
  'En garde! Touché.',
  'Memmen wie dich vernasch ich zum Frühstück, %u%',
  'Meine Großmutter kann besser Rust als du Wicht, %u%',
  'Du bist das hässlichste Wesen dass ich jemals sah, %u%',
  'Gibt es eine größere Memme als dich, %u%?',

  // Not inspired by monkey island.
  'Dini Mueter.',

  // some nice Unicode art
  '凸(-_-)凸',
  '╭∩╮(-_-)╭∩╮',
  '(╯°□°）╯︵ ┻━┻',
];

var stickers = [
  'BQADBAADIAADyIsGAAGeqFpovvSWiwI', // Julius Caesar 👎
  'BQADBAADPwADyIsGAAFyYVwK5nqWFQI', // Elvis Presley 😂
  'BQADBAADLQADyIsGAAE_-arlvGeRjgI', // Jay Hawkins 😲
  'BQADBAADMAADyIsGAAHU8vIAAev_v-UC', // Dante Alighieri 😖
  'BQADBAADFQADyIsGAAEO_vKI0MR5bAI', // Nikola Tesla 😔
  'BQADAgAD5gAD9HsZAAE3KspwHpaxlwI', // 🐨
  'BQADAgAD6gAD9HsZAAFDRbdAUmM_jQI', // 🐻 Facepalm
  'BQADAgAD-AAD9HsZAAGMoglB6izVgwI', // 🐱 OMG
  'BQADAgADQwEAAvR7GQABzeqCC-X7ZYQC', // 👀 Seal
  'BQADAgADYgEAAvR7GQABNgdi7-hwi4gC', // ✋ Hedgehog Middlefinger
  'BQADBAADOQADmu78Ap0s66P75zWsAg', // Toni Brunner 😮
  'BQADBAADRwADmu78AklGZ2FcPSkKAg', // Ueli Maurer 😀
];

/**
 * Returns a random insult
 *
 * @param {string} userName - The user's name who should be insulted
 * @returns {string} A random insult
 */
exports.getRandomInsult = function(userName) {
  var insult = insults[Math.floor(Math.random() * insults.length)];
  return insult.replace('%u%', userName);
};

/**
 * Returns a random insulting sticker
 *
 * @returns {string} The sticker's telegram file_id
 */
exports.getRandomSticker = function() {
  return stickers[Math.floor(Math.random() * stickers.length)];
};

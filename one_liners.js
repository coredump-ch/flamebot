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
  'Das sind große Worte für %u% ohne Grips!',
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
  'Memmen wie dich vernasch’ ich zum Frühstück, %u%',
  'Meine Großmutter kann besser Rust als du Wicht, %u%!',
  'Du bist das hässlichste Wesen, das ich jemals sah, %u%',
  'Gibt es auf dieser Welt ’ne größere Memme als dich, %u%?',
  'Dann ist alles klar, du bist deshalb so dick, %u%!',
  '%u%, sehe ich da Spuren der Angst in deinem Gesicht?',

  // Not inspired by monkey island.
  'Dini Mueter.',

  // Inspired by http://geekdad.com/2013/03/66-geeky-insults-you-can-use-almost-anywhere/
  'Why, you stuck up, half-witted, scruffy-looking … Nerf herder, %u%!', // Princess Leia,  The Empire Strikes Back
  'You know, you are a classic example of the inverse ratio between the size of the mouth and the size of the brain, %u%.', // The Doctor, Doctor Who
  '%u%, a girl with as much talent for disguise as a giraffe in dark glasses trying to get into a polar-bears-only club.', // Blackadder, Blackadder
  'If you spend word for word with me, %u%, I shall make your wit bankrupt.', // William Shakespeare, The Two Gentelman of Verona
  '%u% may look like an idiot and talk like an idiot but don’t let that fool you. He really is an idiot.', // Groucho Marx as Rufus T. Firefly, Duck Soup
  'You’re about as much use as a condom machine in the Vatican, %u%.', // Rimmer, Red Dwarf
  'I’ll explain and I’ll use small words so that you’ll be sure to understand, %u%, you warthog-faced buffoon.', // Westley (The Dread Pirate Roberts), The Princess Bride
  'Don’t look now, but there’s one man too many in this room and I think it’s you, %u%.', // Groucho Marx as Rufus T. Firefly, Duck Soup
  '%u%, I fart in your general direction. Your mother was a hamster and your father smelt of elderberries.', // French Guard, Monty Python and the Holy Grail
  'Well if it isn’t fat stinking billygoat billyboy. How art thou, %u%, thou globby bottle of cheap, stinking chip-oil? Come get some in the yarbles, if you have any yarbles, you eunuch jelly thou!', // Alex Delarge, A Clockwork Orange
  'You are a sad strange little man, and you have my pity, %u%.', // Buzz Light Year, Toy Story
  'To call you stupid would be an insult to stupid people, %u%! I’ve known sheep that could outwit you. I’ve worn dresses with higher IQs.', // Wanda, A Fish Called Wanda
  '%u%. Your heart is full of unwashed socks. Your soul is full of gunk … The three words that best describe you are as follows, and I quote, “Stink, stank, stunk!”', // The Grinch Who Stole Christmas
  '%u% has no enemies, but is intensely disliked by every friend.', // Oscar Wilde
  'You bowl like your momma, %u%. Unless of course she bowls well, in which case you bowl nothing like her.', // Sheldon Cooper, Big Bang Theory
  'Shut up, Big-booty %u%, you coward. You are the weakest individual I ever know.', // Doctor Emilio Lizardo/Lord John Whorfin, Buckaroo Banzai, Across the 8th Dimension
  'Well, I’ll tell you something that should be of vital interest to you. That you, %u%, are a NITWIT!', // The Doctor, Doctor Who
  'I didn’t mean to say that %u% should be hauling garbage. I meant to say that %u% should be hauled away as garbage!', // Korax, Star Trek
  'Don’t get uncool and heavy on me now, %u%.', // Neil, The Young Ones
  'Your brain’s so minute, %u%, that if a hungry cannibal cracked your head open, there wouldn’t be enough to cover a small water biscuit.', // Blackadder, Blackadder
  '%u%, I’m trying to thank you, you pointed-eared hobgoblin!', // Dr. Leonard McCoy, Star Trek
  'Some cause happiness wherever they go; others, whenever they go, %u%.', // Oscar Wilde
  'You are the most obnoxious, trumped-up, farty little smeghead it has ever been my misfortune to encounter, %u%!', // Kryten, Red Dwarf
  'You would bore the leggings off a village idiot, %u%.', // Blackadder, Blackadder
  '%u%, shut your festering gob, you tit! Your type really makes me puke, you vacuous, toffee-nosed, malodorous pervert!', // Monty Python
  'Well, of course, this is just the sort of blinkered philistine ignorance I’ve come to expect from you non-creative garbage, %u%. You sit there on your loathsome spotty behinds squeezing blackheads, not caring a tinker’s cuss for the struggling artist. You excrement, you whining hypocritical toadies with your colour TV sets and your Tony Jacklin golf clubs and your bleeding masonic secret handshakes. You wouldn’t let me join, would you, you blackballing bastards. Well I wouldn’t become a Freemason if you went down on your stinking knees and begged me.', // Monty Python
  'You are a fart factory, slug-slimed sack of rat guts in cat vomit, %u%. A cheesy scab picked pimple squeezing finger bandage. A week old maggot burger with everything on it and flies on the side.', // Rufio, Hook
  'What are you, %u%, a captain in the innuendo squad?', // Micky, Doctor Who
  'Out. For. A. Walk… Bitch.', // Spike, Buffy The Vampire Slayer
  'I desire that we be better strangers, %u%.', // William Shakespeare, As You Like It
  'Go away or I will replace you with a very small shell script, %u%.', // Anonymous
  'It gives me a headache just trying to think down to your level, %u%.', // Marvin The Paranoid Android, The Hitchhiker’s Guide to the Galaxy
  'You are so mercifully free of the ravages of intelligence, %u%.', // Evil, Time Bandits
  'Well, %u%, my days of not takin’ ya seriously are certainly comin’ to a middle.', // Capt. Malcolm Reynolds, Firefly
  'You’re not a complete idiot, %u% … Some parts are missing.', // Anonymous
  'Listen, %u%, don’t you try to outweird me. I get stranger things than you free with my breakfast cereal.', // Zaphod Beeblebrox, The Hitchhiker’s Guide to the Galaxy
  '%u%, I don’t know half of you half as well as I should like; and I like less than half of you half as well as you deserve.', // Bilbo Baggins, The Lord of the Rings
  'Bubble-headed booby %u%.', // Dr Zachary Smith, Lost in Space
  'You’re so dumb, %u%, you think Max Planck is a board used to build really wide houses.', // Anonymous
  'He’s out to lunch, breakfast, dinner, tea, supper, the lot. He’s not in for a single meal, if you ask me, %u%.', // Rimmer, Red Dwarf
  'You are very fat and stupid and persistently wear a ridiculous hat which you should be ashamed of, %u%.', // The Great Zaganza, The Long Dark Tea Time of the Soul
  '%u% has a plentiful lack of wit.', // Hamlet, Hamlet
  'Hand over the calculator, friends don’t let friends derive drunk, %u%.', // Anonymous
  '%u%, I think you have a problem with your brain being missing.', // Zoe, Firefly
  'Allow me to congratulate you, %u%. You have the most totally closed mind I have ever met.', // The Doctor, Doctor Who
  'You’re like a trained ape, only without the training, %u%.', // Simon, Firefly
  'I think … no, I am positive … that you are the most unattractive man I have ever met in my entire life, %u%. In the short time we’ve been together, you have demonstrated every loathsome characteristic of the male personality and even discovered a few new ones. You are physically repulsive, intellectually retarded, you’re morally reprehensible, vulgar, insensitive, selfish, stupid, you have no taste, a lousy sense of humor and you smell. You’re not even interesting enough to make me sick.', // Alexandra Medford, The Witches of Eastwick
  'You were right, %u%. That must be a novel experience for you.', // Avon, Blake’s Seven
  'To you, %u%, the Renaissance was just something that happened to other people, wasn’t it?', // Blackadder, Blackadder
  'You’re so dense, light bends around you, %u%.', // Anonymous
  '%u%, Smeg head.', // Lister, Red Dwarf
  'People, my god; people. Nature gave them tongues, technology gave them loudspeakers, and they all believe that because they can use both, whatever they say is important. Yes, I mean you, %u%.', // Pat Cadagin, Rewired Anthology
  'You’re so stupid, %u%, you think a thesaurus is a monster from Jurassic Park.', // Anonymous
  'Four of your five wits went halting off, and now is %u% governed with one.', // Beatrice, Much Ado About Nothing
  '%u%, freaking idiot.', // Napolean, Napolean Dynomite
  'There are some people you like immediately, some whom you think you might learn to like in the fullness of time, and some that you simply want to push away from you with a sharp stick, %u%.', // Douglas Adams, The Long Dark Tea Time of the Soul
  '%u%, Copernicus just called: You’re not the center of the universe.', // Anonymous
  'The only decent impression %u% can do is of the man with no talent.', // Blackadder, Blackadder
  'Hab SoSlI’ Quch, %u%!', // Anonymous, Klingon
  'You are a driver, %u% — and I use the word in the loosest possible sense, i.e., meaning merely somebody who occupies the driving seat of what I will for the moment call — but I use the term strictly without prejudice — a car while it is proceeding along the road — of stupendous, I would even say verging on the super-human, lack of skill.', // Dirk Gently, The Long Dark Tea Time of the Soul
  'Never hung poison on a fouler toad. Out of my sight! Thou dost infect mine eyes, %u%.', // Anne, Richard III
  'You clinking, clanking, clattering collection of caliginous junk, %u%!', // The Wizard, The Wizard of Oz
  '%u% is about as effective as a cat-flap in an elephant house.', // Blackadder, Blackadder
  'You don’t have the brains to understand, %u%. All you have is printed circuits.', // Captain Kirk, Star Trek
  'If brains were photons you would be perfect for the double slit experiment, %u%.', // Anonymous
  'Look, %u%, we all have something to bring to this discussion. But I think from now on the thing you should bring is silence.', // Arnold Rimmer, Red Dwarf

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

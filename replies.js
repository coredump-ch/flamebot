'use strict';

const FuzzySet = require('fuzzyset.js');

// jscs:disable requireTrailingComma
const insults = new Map([

  // The Secret of Monkey Island
  [
    'Du kämpfst wie ein dummer Bauer.',
    ['Wie passend. Du kämpfst wie eine Kuh.']
  ],
  [
    'Menschen fallen mir zu Füßen, wenn ich komme.',
    ['Auch bevor Sie deinen Atem riechen?']
  ],
  [
    'Ich kenne einige Affen, die haben mehr drauf als du.',
    ['Aha, du warst also beim letzen Familientreffen.']
  ],
  [
    'Meine Narbe im Gesicht stammt aus einem harten Kampf!',
    ['Aha, mal wieder in der Nase gebohrt, wie?']
  ],
  [
    'Du hast die Manieren eines Bettlers.',
    ['Ich wollte, daß du dich wie zuhause fühlst.']
  ],
  [
    'Mein Schwert wird dich aufspießen wie einen Schaschlik!',
    ['Dann mach nicht damit rum wie mit einem Staubwedel.']
  ],
  [
    'Mit meinem Taschentuch werde ich dein Blut aufwischen.',
    ['Also hast du doch den Job als Putze gekriegt.']
  ],
  [
    'Ich hatte mal einen Hund, der war klüger als du.',
    ['Er muß dir das Fechten beigebracht haben.']
  ],
  [
    'Du bist kein echter Gegner für mein geschultes Hirn!',
    ['Vielleicht solltest du es endlich mal benutzen?']
  ],
  [
    'Dein Schwert hat schon bessere Zeiten gesehen.',
    ['Und du wirst deine rostige Klinge nie wieder sehen.']
  ],
  [
    'Niemand wird mich verlieren sehen, du auch nicht!',
    ['Du kannst SO schnell davonlaufen?']
  ],
  [
    'Willst du hören, wie ich 3 Gegner zugleich besiegte?',
    ['Willst du mich mit deinem Geschwafel ermüden?']
  ],
  [
    'Deine Fuchtelei hat nichts mit der Fecht-Kunst zu tun.',
    ['Doch, doch, du hast sie nur nie gelernt.']
  ],
  [
    'Trägst du immer noch Windeln?',
    ['Wieso, die könntest DU viel eher gebrauchen!']
  ],
  [
    'An deiner Stelle würde ich zur Landratte werden!',
    ['Hattest du das nicht vor kurzem getan?']
  ],
  [
    'Jeder hier kennt dich doch als unerfahrenen Dummkopf!',
    ['Zu Schade, daß DICH überhaupt niemand kennt.']
  ],

  //  The Curse of Monkey Island
  [
    'Bis jetzt wurde jeder Gegner von mir eliminiert!',
    ['Das war ja auch leicht, dein Atem hat sie paralysiert.',
    'Ganze Inselreiche haben vor mir kapituliert.']
  ],

  [
    'Wirst du laut Testament eingeäschert oder einbalsamiert?',
    ['Sollt’ ich in deiner Nähe sterben, möcht’ ich, daß man mich desinfiziert!',
    'Ich lasse dir die Wahl: erdolcht, erhängt oder guillotiniert.']
  ],

  [
    'Dich zu töten wäre eine legale Beseitigung!',
    ['Dich zu töten wäre dann eine legale Reinigung!',
    'Bist du das? Es riecht hier so nach Jauche und Dung!']
  ],

  [
    'Himmel bewahre! Für einen Hintern wäre dein Gesicht eine Beleidigung!',
    ['In Formaldehyd aufbewahrt trügst du bei zu meiner Erheiterung!',
    'Ist der Blick in den Spiegel für Dich jeden Tag nicht eine Erniedrigung?']
  ],

  [
    'Du bist so häßlich wie ein Affe in einem Negligé!',
    ['Hoffentlich zerrst du mich nicht gleich ins Separée!',
    'Du hast soviel Sexappeal wie ein Croupier.']
  ],

  [
    'Mein Herz rast, denk’ ich an deine Beseitigung!',
    ['Dann wäre koffeinfreier Kaffee ein erster Schritt zur Läuterung!',
    'Dein Geplänkel kommt nicht richtig in Schwung!']
  ],

  [
    'Warst Du schon immer so häßlich oder bist du mutiert?',
    ['Da hat sich wohl dein Spiegelbild in meinem Säbel reflektiert!',
    'Wurdest du damals von einem Schwein adoptiert?']
  ],

  [
    'Haben sich deine Eltern nach deiner Geburt sterilisiert?',
    ['Zumindest hat man meine identifiziert!',
    'Du bist eine Schande für deine Gattung, so dilletiert.']
  ],

  [
    'Ich spieß’ Dich auf wie eine Sau am Buffet!',
    ['Wenn ich mit DIR fertig bin, bist du nur noch Filet!',
    'Auch wenn du es nicht glaubst, aus dir mach ich Haschee.']
  ],

  [
    'Überall in der Karibik wird mein Name respektiert!',
    ['Zu schade, daß das hier niemanden tangiert!',
    'Durch meine Fechtkunst bin ich zum Sieger prädestiniert.']
  ],

  [
    'Niemand kann mich stoppen, mich - den Schrecken der See!',
    ['Ich könnte es tun, hättest du nur ein Atemspray!',
    'Es mit mir aufzunehmen gleicht einer Odyssee.']
  ],

  [
    'Ich werde dich richten, und es gibt kein Plädoyer!',
    ['Das ich nicht lache! Du und welche Armee?',
    'Jetzt werde ich dich erstechen, da hilft kein Protegé!']
  ],

  [
    'En garde! Touché.',
    ['Oh, das ist ein solch übles Klischee!',
    'Deine Mutter trägt ein Toupet.']
  ],

  [
    'Ein jeder hat vor meiner Schwertkunst kapituliert!',
    ['Dein Geruch allein reicht aus und ich wär’ kollabiert!',
    'Ich weiß nicht, welche meiner Eigenschaften dir am meisten imponiert.']
  ],

  [
    'Fühl’ ich den Stahl in der Hand, bin ich in meinem Metier!',
    ['Ich glaub’, es gibt für dich noch eine Stelle beim Varieté.',
    'Ich laufe auf glühenden Kohlen und Barfuß im Schnee.']
  ],

  [
    'Mein Mienenspiel zeigt dir meine Mißbilligung!',
    ['Für dein Gesicht bekommst du ’ne Begnadigung!',
    'Mein Antlitz zeugt von edler Abstammung!']
  ],

  // Escape from Monkey Island
  [
    'Memmen wie dich vernasch’ ich zum Frühstück.',
    ['Dann ist alles klar, du bist deshalb so dick!']
  ],

  [
    'Viele Menschen sagen, meine Kraft ist unglaublich.',
    ['Unglaublich erbärmlich, das sag’ ab jetzt ich!']
  ],

  [
    'Alle Welt fürchtet die Kraft meiner Faust.',
    ['Wobei mir vor allem vor deinem Atem graust.']
  ],

  [
    'Ich habe Muskeln an Stellen von denen du nichst ahnst.',
    ['Zu schade, dass keiner davon in deinen Armen ist.']
  ],

  [
    'Ich hab’ mit diesen Armen schon Kraken bezwungen.',
    ['Und Babys wohl auch, na, der Witz ist gelungen.']
  ],

  [
    'Ich kenne Läuse mit stärkeren Muskeln.',
    ['Behalt sie für dich, sonst bekomm’ ich noch Pusteln.']
  ],

  [
    'Gib auf oder ich zerquetsch’ dich wie eine lästige Mücke.',
    ['Wenn ich mit dir fertig bin, brauchst du ’ne Krücke!']
  ],

  [
    'Meine Großmutter hat mehr Kraft als du Wicht!',
    ['Dafür hab’ ich in der Hand nicht die Gicht!']
  ],

  [
    'Nach diesem Spiel trägst du den Arm in Gips.',
    ['Das sind große Worte für ’nen Kerl ohne Grips!']
  ],

  [
    'Hey, schau mal da drüben!',
    ['Ja, ja, ich weiß, ein dreiköpfiger Affe!']
  ],

  [
    'Du bist das hässlichste Wesen, das ich jemals sah',
    ['Mit Ausnahme von deiner Frau, so viel ist klar!']
  ],

  [
    'Ich zerreiße deine Hand in eine Million Fetzen.',
    ['Ich wusste gar nicht, dass du so weit zählen kannst.']
  ],

  [
    'Ich werde deine Knochen zu Brei zermalmen.',
    ['Ich werde mich wehren, bis die Griffel dir qualmen!']
  ],

  [
    'Sehe ich da Spuren der Angst in deinem Gesicht?',
    ['Ha, ha! Das ist ein Lachen, du schwächlicher Wicht!']
  ],

  [
    'Gibt es auf dieser Welt ’ne größere Memme als dich?',
    ['Sie sitzt mir gegenüber, also was fragst du mich?']
  ],
]);

// jscs:enable requireTrailingComma

const fuzzy = FuzzySet([...insults.keys()]);

/**
 * Checks if the query is found and returns an according reply
 *
 * @param {string} query - A query text
 * @returns {(string|undefined)} A reply or undefined if query not found
 */
module.exports.search = function (query) {
  let match = fuzzy.get(query);
  if (!match) {
    return;
  }

  let score = match[0][0];
  if (score > 0.5) {
    let result = match[0][1];
    let possibleCounters = insults.get(result);
    return possibleCounters[Math.floor(Math.random() * possibleCounters.length)];
  }
};


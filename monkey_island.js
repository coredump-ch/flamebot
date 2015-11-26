var FuzzySet = require('fuzzyset.js');

var insults = new Map([
    // The Secret of Monkey Island
    [
      "Du kämpfst wie ein dummer Bauer.",
      "Wie passend. Du kämpfst wie eine Kuh."
    ],
    [
      "Menschen fallen mir zu Füßen, wenn ich komme.",
      "Auch bevor Sie deinen Atem riechen?"
    ],
    [
      "Ich kenne einige Affen, die haben mehr drauf als du.",
      "Aha, du warst also beim letzen Familientreffen."
    ],
    [
      "Meine Narbe im Gesicht stammt aus einem harten Kampf!",
      "Aha, mal wieder in der Nase gebohrt, wie?"
    ],
    [
      "Du hast die Manieren eines Bettlers.",
      "Ich wollte, daß du dich wie zuhause fühlst."
    ],
    [
      "Mein Schwert wird dich aufspießen wie einen Schaschlik!",
      "Dann mach nicht damit rum wie mit einem Staubwedel."
    ],
    [
      "Mit meinem Taschentuch werde ich dein Blut aufwischen.",
      "Also hast du doch den Job als Putze gekriegt."
    ],
    [
      "Ich hatte mal einen Hund, der war klüger als du.",
      "Er muß dir das Fechten beigebracht haben."
    ],
    [
      "Du bist kein echter Gegner für mein geschultes Hirn!",
      "Vielleicht solltest du es endlich mal benutzen?"
    ],
    [
      "Dein Schwert hat schon bessere Zeiten gesehen.",
      "Und du wirst deine rostige Klinge nie wieder sehen."
    ],
    [
      "Niemand wird mich verlieren sehen, du auch nicht!",
      "Du kannst SO schnell davonlaufen?"
    ],
    [
      "Willst du hören, wie ich 3 Gegner zugleich besiegte?",
      "Willst du mich mit deinem Geschwafel ermüden?"
    ],
    [
      "Deine Fuchtelei hat nichts mit der Fecht-Kunst zu tun.",
      "Doch, doch, du hast sie nur nie gelernt."
    ],
    [
      "Trägst du immer noch Windeln?",
      "Wieso, die könntest DU viel eher gebrauchen!"
    ],
    [
      "An deiner Stelle würde ich zur Landratte werden!",
      "Hattest du das nicht vor kurzem getan?"
    ],
    [
      "Jeder hier kennt dich doch als unerfahrenen Dummkopf!",
      "Zu Schade, daß DICH überhaupt niemand kennt."
    ],
]);

var fuzzy = FuzzySet([...insults.keys()]);

module.exports.search = function(query) {
    var match = fuzzy.get(query);
    if (!match) {
        return;
    }
    var score = match[0][0];
    if (score > 0.5) {
        var result = match[0][1];
        return insults.get(result);
    }
}


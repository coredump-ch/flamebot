var FuzzySet = require('fuzzyset.js');

var insults = [
    // The Secret of Monkey Island
    "Du kämpfst wie ein dummer Bauer.",
    "Menschen fallen mir zu Füßen, wenn ich komme.",
    "Ich kenne einige Affen, die haben mehr drauf als du.",
    "Meine Narbe im Gesicht stammt aus einem harten Kampf!",
    "Du hast die Manieren eines Bettlers.",
    "Mein Schwert wird dich aufspießen wie einen Schaschlik!",
    "Mit meinem Taschentuch werde ich dein Blut aufwischen.",
    "Ich hatte mal einen Hund, der war klüger als du.",
    "Du bist kein echter Gegner für mein geschultes Hirn!",
    "Dein Schwert hat schon bessere Zeiten gesehen.",
    "Niemand wird mich verlieren sehen, du auch nicht!",
    "Willst du hören, wie ich 3 Gegner zugleich besiegte?",
    "Deine Fuchtelei hat nichts mit der Fecht-Kunst zu tun.",
    "Trägst du immer noch Windeln?",
    "An deiner Stelle würde ich zur Landratte werden!",
    "Jeder hier kennt dich doch als unerfahrenen Dummkopf!",
];

var counters = [
    // The Secret of Monkey Island
    "Wie passend. Du kämpfst wie eine Kuh.",
    "Auch bevor Sie deinen Atem riechen?",
    "Aha, du warst also beim letzen Familientreffen.",
    "Aha, mal wieder in der Nase gebohrt, wie?",
    "Ich wollte, daß du dich wie zuhause fühlst.",
    "Dann mach nicht damit rum wie mit einem Staubwedel.",
    "Also hast du doch den Job als Putze gekriegt.",
    "Er muß dir das Fechten beigebracht haben.",
    "Vielleicht solltest du es endlich mal benutzen?",
    "Und du wirst deine rostige Klinge nie wieder sehen.",
    "Du kannst SO schnell davonlaufen?",
    "Willst du mich mit deinem Geschwafel ermüden?",
    "Doch, doch, du hast sie nur nie gelernt.",
    "Wieso, die könntest DU viel eher gebrauchen!",
    "Hattest du das nicht vor kurzem getan?",
    "Zu Schade, daß DICH überhaupt niemand kennt.",
];

var fuzzy = FuzzySet(insults);

module.exports.search = function(query) {
    var match = fuzzy.get(query);
    if (!match) {
        return;
    }
    var score = match[0][0];
    if (score > 0.5) {
        var result = match[0][1];
        for (var i=0; i<insults.length; ++i) {
            if (insults[i]===result) {
                return counters[i];
            }
        }
    }
}


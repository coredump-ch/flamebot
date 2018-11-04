import 'jasmine';

import {getRandomInsult, getRandomTextInsult} from '../src/oneliners';
import {Sticker} from '../src/sticker';

describe('oneliners', () => {

  it('getRandomInsult', () => {
    for (let i = 0; i < 100; i++) {
      const insult = getRandomInsult('monsieur turlututu');
      expect(typeof insult === 'string' || insult instanceof Sticker).toBe(true);
      if (typeof insult === 'string') {
        expect(insult.length).toBeGreaterThan(0);
      }
    }
  });

  it('getRandomTextInsult', () => {
    for (let i = 0; i < 100; i++) {
      const insult = getRandomTextInsult('monsieur turlututu');
      expect(typeof insult === 'string').toBe(true);
      expect(insult.length).toBeGreaterThan(0);
    }
  });

});

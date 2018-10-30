import 'jasmine';

import {searchReply} from '../src/replies';

describe('replies', () => {

  describe('searchReply', () => {

    it('should recognize monkey island insults (exact match)', () => {
      const reply = searchReply('Willst du hören, wie ich 3 Gegner zugleich besiegte?');
      expect(reply).toEqual('Willst du mich mit deinem Geschwafel ermüden?');
    });

    it('should recognize monkey island insults (fuzzy match)', () => {
      const reply = searchReply('Willst du hören, wie ich alle Gegner besiegte?');
      expect(reply).toEqual('Willst du mich mit deinem Geschwafel ermüden?');
    });

    it('should return null if no match is found', () => {
      const reply = searchReply('Willst du, wie ein Bauer?');
      expect(reply).toBeNull();
    });

  });

});

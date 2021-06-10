import {getRandomInsult, getRandomTextInsult} from './oneliners';
import {searchReply} from './replies';
import {Sticker} from './sticker';

/**
 * Handle an incoming text message.
 *
 * Return a reply, or null.
 *
 * @param text - The text message sent by the user.
 * @param name - The name or username of the user that sent the message.
 * @param supportStickers - Whether stickers should be returned or not.
 * @param directMentoin - Whether the text contained a direct mention.
 */
export function handleMessage(
  text: string | null | undefined,
  name: string,
  flameRate: number,
  supportStickers: boolean,
  directMention: boolean,
): string | Sticker | null {
  // Prepare random insult
  let randomInsult;
  if (supportStickers) {
    randomInsult = getRandomInsult(name);
  } else {
    randomInsult = getRandomTextInsult(name);
  }

  if (text !== null && text !== undefined) {
    // Find matching reply
    const matchingReply = searchReply(text);
    if (matchingReply) {
      return matchingReply;
    }

    // The mother of all jokes
    if (/mue?tt?(er|i)/i.test(text)) {
      return 'HANI MUETTER GHÖRT??!';
    }

    // Cyber cyber
    if (supportStickers && /cyber/i.test(text)) {
      let sticker;
      if (Math.random() < 0.5) {
        // CYBER ATTACKS AHEAD
        sticker = new Sticker('CAADAgADnAADGW8XB9XpWOhkV96rAg');
      } else {
        // CYBER
        sticker = new Sticker('CAADAgADlgADGW8XB1uhplTaDTPOAg');
      }
      return sticker;
    }

    // Direct mentions
    if (directMention) {
      return randomInsult;
    }
  }

  // Random insults
  if (Math.random() < flameRate) {
    return randomInsult;
  }

  return null;
}

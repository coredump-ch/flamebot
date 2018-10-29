import * as TelegramBot from 'node-telegram-bot-api';

import {getRandomInsult} from './oneliners';
import {searchReply} from './replies';
import {Service} from './services';
import {Sticker} from './Sticker';

/**
 * The most polite bot in the world.
 * Telegram integration.
 */
export class TelegramFlameBot implements Service {
  private logTag = '[Telegram]';

  private flameRate: number;
  private telegram: TelegramBot;

  private usernamePromise: Promise<string>;

  /**
   * Constructs the flame bot
   * @param flameRate - The chance how often the bot flames back on a message (1 = 100 %)
   * @param telegram - The telegram bot API dependency
   */
  constructor(flameRate: number, telegram: TelegramBot) {
    this.flameRate = flameRate;
    this.telegram = telegram;

    // The bot username
    this.usernamePromise = new Promise((resolve, reject) => {
      telegram.getMe().then((me: TelegramBot.User) => {
        resolve(me.username);
      }, reject);
    });
  }

  /**
   * Sets the handler to listen to messages
   */
  public start() {
    console.info(this.logTag, 'Starting handler');
    this.telegram.on('message', (message: TelegramBot.Message) => {
      this.handleMessage(message);
    });
  }

  /**
   * Replies with an insult
   *
   * @param message - The message to reply to
   * @param user - The user to insult
   */
  private replyRandomInsult(message: TelegramBot.Message, user: TelegramBot.User) {
    const insult = getRandomInsult(user.first_name);
    this.reply(insult, message);
  }

  /**
   * Replies to a message
   *
   * @param reply - The text or Sticker to send
   * @param message - The message to reply to
   */
  private reply(reply: string | Sticker, message: TelegramBot.Message) {
    if (reply instanceof Sticker) {
      const stickerFileId = reply.fileId;
      this.telegram.sendSticker(message.chat.id, stickerFileId, { reply_to_message_id: message.message_id });
    } else {
      this.telegram.sendMessage(message.chat.id, reply, { reply_to_message_id: message.message_id });
    }
  }

  /**
   * Handles new messages and replies with insults if necessary
   *
   * @param message - The message to reply to
   */
  private async handleMessage(message: TelegramBot.Message) {
    // To find a sticker id: Send it to the bot in private chat
    if (message.chat.type === 'private' && message.sticker) {
      this.reply('Sticker file_id: ' + message.sticker.file_id, message);
      return;
    }

    // Insult new group members
    if (message.new_chat_members) {
      for (const member of message.new_chat_members) {
        this.replyRandomInsult(message, member);
      }
      return;
    }

    // Replies can only be sent to messages with a sender!
    if (!message.from) {
      return;
    }

    // Reply to messages
    if (message.text) {

      // TODO: Move the following checks into single reply function

      // Find matching replies
      const repliesMatch = searchReply(message.text);
      if (repliesMatch) {
        this.reply(repliesMatch, message);
        return;
      }

      // The mother of all jokes
      if (/mue?tt?(er|i)/i.test(message.text)) {
        this.reply('HANI MUETTER GHÖRT??!', message);
        return;
      }

      // Cyber cyber
      if (/cyber/i.test(message.text)) {
        let sticker;
        if (Math.random() < 0.5) {
          // CYBER ATTACKS AHEAD
          sticker = new Sticker('CAADAgADnAADGW8XB9XpWOhkV96rAg');
        } else {
          // CYBER
          sticker = new Sticker('CAADAgADlgADGW8XB1uhplTaDTPOAg');
        }
        this.reply(sticker, message);
        return;
      }

      // Mentions
      const botUsername = await this.usernamePromise;
      if (new RegExp(botUsername, 'i').test(message.text)) {
        this.replyRandomInsult(message, message.from);
        return;
      }
    }

    // Random insults
    if (Math.random() < this.flameRate) {
      this.replyRandomInsult(message, message.from);
    }
  }
}

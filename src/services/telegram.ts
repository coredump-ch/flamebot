import * as TelegramBot from 'node-telegram-bot-api';

import {handleMessage} from '../core';
import {getRandomInsult} from '../oneliners';
import {searchReply} from '../replies';
import {Sticker} from '../sticker';
import {Service} from './services';

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
   * Constructor.
   *
   * @param flameRate - The chance how often the bot flames back on a message (1 = 100 %)
   * @param debug - Whether to log debug information
   * @param telegram - The telegram bot API dependency
   */
  constructor(flameRate: number, debug: boolean, telegram: TelegramBot) {
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
   * Start the Telegram integration.
   */
  public start() {
    console.info(this.logTag, `Starting handler with flame rate ${this.flameRate}`);
    this.telegram.on('message', (message: TelegramBot.Message) => {
      this.handleMessage(message);
    });
  }

  /**
   * Reply with a random insult.
   *
   * @param message - The message to reply to
   * @param user - The user to insult
   */
  private replyRandomInsult(message: TelegramBot.Message, user: TelegramBot.User) {
    const name = this.getName(user);
    if (name) {
      const insult = getRandomInsult(name);
      this.reply(insult, message);
    } else {
      console.warn(this.logTag, 'Could not determine user name');
    }
  }

  /**
   * Reply to a message.
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

    // Replies can only be sent if the user has a name
    const name = this.getName(message.from);
    if (!name) {
      return;
    }

    // Determine reply
    const botUsername = await this.usernamePromise;
    const directMention = !!message.text && new RegExp(botUsername, 'i').test(message.text);
    const insult = handleMessage(message.text, name, this.flameRate, true, directMention);
    if (insult !== null) {
      this.reply(insult, message);
    }
  }

  /**
   * Determine the user name.
   */
  private getName(user: TelegramBot.User): string | null {
    if (user.first_name) {
      return user.first_name;
    } else if (user.username) {
      return user.username;
    } else if (user.last_name) {
      return user.last_name;
    }
    return null;
  }
}

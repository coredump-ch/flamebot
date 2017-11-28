'use strict';

const Sticker = require('./Sticker.js');

/**
 * The most polite bot in the world
 */
class FlameBot {
  /**
   * Constructs the flame bot
   * @param {number} flameRate - The chance how often the bot flames back on a message (1 = 100 %)
   * @param {Object} oneLiners - The oneLiners dependency
   * @param {Object} replies - The replies dependency
   * @param {Object} telegram - The telegram bot API dependency
   */
  constructor(flameRate, oneLiners, replies, telegram) {
    /**
     * The chance how often the bot flames back on a message (1 = 100 %)
     * @type {number}
     */
    this.flameRate = flameRate;
    /**
     * The oneLiners dependency
     * @type {Object}
     */
    this.oneLiners = oneLiners;
    /**
     * The replies dependency
     * @type {Object}
     */
    this.replies = replies;
    /**
     * The telegram telegram dependency
     * @type {Object}
     */
    this.telegram = telegram;

    /**
     * The bots username as a Promise
     * @type {Promise.<string>}
     */
    this.usernamePromise = new Promise((resolve, reject) => {
      telegram.getMe().then((me) => {
        resolve(me.username);
      }, reject);
    });
  }

  /**
   * Sets the handler to listen to messages
   */
  start() {
    this.telegram.on('message', (message) => {
      this.handleMessage(message);
    });
  }

  /**
   * Replies with an insult
   *
   * @param {Object} message - The message to reply to
   * @param {Object} user - The user to insult
   */
  replyRandomInsult(message, user) {
    const insult = this.oneLiners.getRandomInsult(user.first_name);
    this.reply(insult, message);
  }

  /**
   * Replies to a message
   *
   * @param {(string|Sticker)} reply - The text or Sticker to send
   * @param {Object} message - The message to reply to
   */
  reply(reply, message) {
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
   * @param {Object} message - The message to reply to
   */
  handleMessage(message) {
    // To find a sticker id: Send it to the bot in private chat
    if (message.chat.type === 'private' && message.sticker) {
      this.reply('Sticker file_id: ' + message.sticker.file_id, message);
      return;
    }

    if (message.new_chat_participant) {
      this.replyRandomInsult(message, message.new_chat_participant);
      return;
    }

    if (message.text) {
      const repliesMatch = this.replies.search(message.text);
      if (repliesMatch) {
        this.reply(repliesMatch, message);
        return;
      }

      if (/mue?tt?(er|i)/i.test(message.text)) {
        this.reply('HANI MUETTER GHÖRT??!', message);
        return;
      }

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

      this.usernamePromise.then((username) => {
        if (new RegExp(username, 'i').test(message.text)) {
          this.replyRandomInsult(message, message.from);
          return;
        }
      });
    }

    if (Math.random() < this.flameRate) {
      this.replyRandomInsult(message, message.from);
    }
  }
}

module.exports = FlameBot;

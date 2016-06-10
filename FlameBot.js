'use strict';

/**
 * The most polite bot in the world
 */
class FlameBot {
  /**
   * Constructs the flame bot
   * @param {number} flameRate - The chance how often the bot flames back on a message (1 = 100 %)
   * @param {number} stickerRate - The chance how often the bot replies with a sticker instead of a message (1 = 100 %)
   * @param {Object} oneLiners - The oneLiners dependency
   * @param {Object} replies - The replies dependency
   * @param {Object} telegram - The telegram bot API dependency
   */
  constructor(flameRate, stickerRate, oneLiners, replies, telegram) {
    /**
     * The chance how often the bot flames back on a message (1 = 100 %)
     * @type {number}
     */
    this.flameRate = flameRate;
    /**
     * The chance how often the bot replies with a sticker instead of a message (1 = 100 %)
     * @type {number}
     */
    this.stickerRate = stickerRate;
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
  replyInsult(message, user) {
    if (Math.random() > this.stickerRate) {
      const insult = this.oneLiners.getRandomInsult(user.first_name);
      this.replyText(insult, message);
    } else {
      const sticker = this.oneLiners.getRandomSticker();
      this.telegram.sendSticker(message.chat.id, sticker, { reply_to_message_id: message.message_id });
    }
  }

  /**
   * Replies text to a message
   *
   * @param {string} text - The text to send
   * @param {Object} message - The message to reply to
   */
  replyText(text, message) {
    this.telegram.sendMessage(message.chat.id, text, { reply_to_message_id: message.message_id });
  }

  /**
   * Handles new messages and replies with insults if necessary
   *
   * @param {Object} message - The message to reply to
   */
  handleMessage(message) {
    // To find a sticker id: Send it to the bot in private chat
    if (message.chat.type === 'private' && message.sticker) {
      this.replyText('Sticker file_id: ' + message.sticker.file_id, message);
    }

    if (message.new_chat_participant) {
      this.replyInsult(message, message.new_chat_participant);
    } else if (message.text) {
      const repliesMatch = this.replies.search(message.text);
      if (repliesMatch) {
        this.replyText(repliesMatch, message);
      } else if (/mue?tt?(er|i)/i.test(message.text)) {
        this.replyText('HANI MUETTER GHÖRT??!', message);
      } else {
        this.usernamePromise.then((username) => {
          if (new RegExp(username, 'i').test(message.text) || Math.random() < this.flameRate) {
            this.replyInsult(message, message.from);
          }
        });
      }
    } else if (Math.random() < this.flameRate) {
      this.replyInsult(message, message.from);
    }
  }
}

module.exports = FlameBot;

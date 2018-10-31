import * as bodyParser from 'body-parser';
import * as express from 'express';

import {handleMessage} from '../core';
import {searchReply} from '../replies';
import {Service} from './services';

interface MattermostPayload {
  token: string;
  team_id: string;
  team_domain: string;
  channel_id: string;
  channel_name: string;
  timestamp: number;
  user_id: string;
  user_name: string;
  post_id: string;
  text: string;
  trigger_word: string;
  file_ids: string;
}

/**
 * Type guard: Make sure that the value is a string.
 */
function isString(val: any): val is string {
  return typeof val === 'string';
}

/**
 * The most polite bot in the world.
 * Mattermost integration.
 */
export class MattermostFlameBot implements Service {
  private logTag = '[Mattermost]';

  private flameRate: number;
  private port: number;
  private debug: boolean;
  private token: string;

  private app: express.Application;

  /**
   * Constructor.
   *
   * @param flameRate - The chance how often the bot flames back on a message (1 = 100 %)
   * @param port - The port to listen on (e.g. 8000)
   * @param debug - Whether to log debug information
   * @param token - The Mattermost hook token
   */
  constructor(flameRate: number, port: number, debug: boolean, token: string) {
    this.flameRate = flameRate;
    this.app = express();
    this.port = port;
    this.token = token;
    this.debug = debug;

    // Set up JSON body parsing
    this.app.use(bodyParser.json());

    // Set up routes
    this.route();
  }

  /**
   * Set up routes.
   */
  private route() {
    this.app.post('/callback/mattermost/', this.callbackHandler.bind(this));
  }

  /**
   * Handle incoming callbacks.
   */
  private callbackHandler(req: express.Request, res: express.Response) {
    if (this.debug) {
      console.debug(this.logTag, '=>', req.method, req.body);
    }

    const payload: MattermostPayload = req.body;

    // Validate token
    if (!this.tokenValid(payload)) {
      console.info(this.logTag, '<= HTTP 400 (invalid token)');
      res
        .status(400)
        .send('Invalid token');
      return;
    }

    // Ensure that text was sent
    if (!payload.text) {
      return this.staySilent(res);
    }

    // Determine reply
    const directMention = new RegExp('flame ?bot', 'i').test(payload.text);
    const insult = handleMessage(payload.text, `@${payload.user_name}`, this.flameRate, false, directMention);
    if (insult !== null && isString(insult)) {
      return this.reply(res, insult);
    }

    return this.staySilent(res);
  }

  /**
   * Return an empty response that won't trigger a reply.
   */
  private staySilent(res: express.Response): void {
    if (this.debug) {
      console.info(this.logTag, '<= HTTP 200 (no reply)');
    }
    res
      .status(200)
      .send({});
  }

  /**
   * Send a reply.
   */
  private reply(res: express.Response, text: string): void {
    console.info(this.logTag, '<= HTTP 200 (text reply)');
    res
      .status(200)
      .send({text: text, response_type: 'comment'});
  }

  /**
   * Validate the token.
   */
  private tokenValid(payload: MattermostPayload) {
    return payload.token !== undefined
        && payload.token !== null
        && payload.token === this.token;
  }

  /**
   * Start the webhook server.
   */
  public start(): void {
    this.app.listen(this.port, () => {
      console.info(this.logTag, `Starting server on port ${this.port} with flame rate ${this.flameRate}`);
    });
  }
}

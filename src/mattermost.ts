import * as bodyParser from 'body-parser';
import * as express from 'express';

import {getRandomInsult} from './oneliners';
import {searchReply} from './replies';
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
 * The most polite bot in the world.
 * Mattermost integration.
 */
export class MattermostFlameBot implements Service {
  private logTag = '[Mattermost]';

  private flameRate: number;
  private port: number;
  private token: string;

  private app: express.Application;

  /**
   * Constructs the flame bot
   * @param flameRate - The chance how often the bot flames back on a message (1 = 100 %)
   * @param port - The port to listen on (e.g. 8000)
   * @param token - The Mattermost hook token
   */
  constructor(flameRate: number, port: number, token: string) {
    this.flameRate = flameRate;
    this.app = express();
    this.port = port;
    this.token = token;

    // Set up JSON body parsing
    this.app.use(bodyParser.json());

    // Set up routes
    this.route();
  }

  private route() {
    this.app.post('/callback/mattermost/', this.callbackHandler.bind(this));
  }

  /**
   * Handle incoming callbacks.
   */
  private callbackHandler(req: express.Request, res: express.Response) {
    const payload: MattermostPayload = req.body;

    // Validate token
    if (!this.tokenValid(payload)) {
      res
        .status(400)
        .send('Invalid token');
      return;
    }

    // Ensure that text was sent
    if (!payload.text) {
      return this.staySilent(res);
    }

    // Find matching replies
    const repliesMatch = searchReply(payload.text);
    if (repliesMatch) {
      return this.reply(res, repliesMatch);
    }

    return this.staySilent(res);
  }

  private staySilent(res: express.Response): void {
    res
      .status(200)
      .send({});
  }

  private reply(res: express.Response, text: string): void {
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

  public start(): void {
    this.app.listen(this.port, () => console.info(this.logTag, `Starting server on port ${this.port}`));
  }
}

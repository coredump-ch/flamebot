# Coredump Flamebot

[![CircleCI][circle-ci-badge]][circle-ci]
[![Docker Image][docker-image-badge]][docker-image]
[![License](https://img.shields.io/badge/License-ISC-blue.svg)](https://github.com/coredump-ch/flamebot/blob/master/LICENSE)

A chatbot that flames everything! Available on Telegram as
[@CoredumpFlameBot](https://telegram.me/CoredumpFlameBot), but it also supports
Mattermost.


# Features

These are the tasteful features of Flamebot:

 * Respond with insults to group chat messages with a certain probability
 * Respond to Monkey Island insult sword fighting quotes
 * Make new members in your chat group feel welcome by insulting them (Telegram only)


# Usage

Setup:

 * Run `npm install` to install dependencies.
 * Copy `example.env` to `.env` and add the tokens

The bot will connect directly to Telegram. It will also open a webserver that
is compatible with Mattermost Outgoing Webhooks.


# Developing

## Build

    npm run build

## Watch

This will recompile the TypeScript files automatically when they change:

    npm run watch

## Run

    npm run serve

## Lint

    npm run lint

You can also install a pre-push hook to do the linting:

    echo -e '#!/bin/sh\nnpm run lint' > .git/hooks/pre-push
    chmod +x .git/hooks/pre-push


# Docker

Run the `coredump/flamebot` image.

    docker run \
        -e FLAMEBOT_PORT=3000 \
        -e MATTERMOST_TOKEN=asdf \
        -e TELEGRAM_TOKEN=jklo \
        -p 8000:8000 \
        coredump/flamebot:latest

Required configuration variables (env):

- `MATTERMOST_TOKEN`: The mattermost outgoing hook token
- `TELEGRAM_TOKEN`: The telegram bot token

Optional configuration variables (env):

- `FLAMEBOT_PORT`: What port to listen on for the Mattermost hook server (default `8000`)
- `FLAMEBOT_DEBUG`: Whether to enable debug logging, either "true" or "false" (default `false`)
- `FLAMEBOT_FLAME_RATE`: The flame rate between "0" (never flame) and "1" (always flame) (default `0.03`)

The Mattermost server will listen on `:$FLAMEBOT_PORT/callback/mattermost/`.
Configure an outgoing hook that points to that URL.


# Testimonials

```
<FlameBot> Ich hatte mal einen Hund, der war klüger als du, Heinrich.
<Henry> HAUT DINI FRÄSSE DU HUERE VOUMONGO
```

```
<FlameBot> Hab SoSlI’ Quch, freelancer!
<The-Compiler> wat
<Henry> DI HET GOPFERDAMMI KE MÖNSCH GFRAGT
```

```
<Henry> dini fetti mueter!
<FlameBot> HANI MUETTER GHÖRT??!
<Henry> JA MANN
<Henry> MUETER VERDAMMT
```


<!-- Badges -->
[circle-ci]: https://circleci.com/gh/coredump-ch/flamebot
[circle-ci-badge]: https://circleci.com/gh/coredump-ch/flamebot.svg?style=shield&circle-token=:circle-token
[docker-image]: https://hub.docker.com/r/coredump/flamebot/
[docker-image-badge]: https://img.shields.io/badge/docker%20image-coredump%2Fflamebot-blue.svg?logo=docker

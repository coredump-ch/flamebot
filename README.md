# Coredump Flamebot

[![Build status](https://circleci.com/gh/coredump-ch/telegram-flame-bot.svg?style=shield&circle-token=:circle-token)](https://circleci.com/gh/coredump-ch/telegram-flame-bot)
[![License](https://img.shields.io/badge/License-ISC-blue.svg)](https://github.com/coredump-ch/telegram-flame-bot/blob/master/LICENSE)

A chatbot that flames everything! Available on Telegram as
[@CoredumpFlameBot](https://telegram.me/CoredumpFlameBot), but it also supports
Mattermost.


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

Configuration variables (env):

- `FLAMEBOT_PORT`: What port to listen on for the Mattermost hook server
- `MATTERMOST_TOKEN`: The mattermost outgoing hook token
- `TELEGRAM_TOKEN`: The telegram bot token

The Mattermost server will listen on `:$PORT/callback/mattermost/`.
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

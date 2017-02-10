# Bot

My attempt at writing a Slack bot.

## Install
* Create a new bot at https://my.slack.com/services/new/bot.
* Request NS API access at https://www.ns.nl/ews-aanvraagformulier/?0.
* Copy `.env.dist` to `.env` and enter your secrets.
* Run `yarn` to install dependencies.

## Usage
* Run `yarn start`.
* Your Slack bot is now listening for messages! Try typing:

  > @[name-of-bot] heeey!

## Deploying
* Install [now](https://zeit.co/now).
* Run `now -E`.
* Done!

## License
MIT

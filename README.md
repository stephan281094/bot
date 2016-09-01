# Bot

My attempt at writing a Slack bot. Just a learning project!

## How to install
* Create a new bot: https://my.slack.com/services/new/bot
* Add `.npmrc` with the following:

  ```shell
  BOT_API_KEY = xoxb-your-api-key
  WEATHER_API-KEY = Your Wunderground Api key
  WEATHER_DEFAULT_STATE = default state or country
  ```

## How to run
* Run `npm install`
* Run `npm start`
* Your Slack bot is now listening for messages! Try typing:

  > @[name-of-bot] heeey!

## Functions
* Calculations: Type 'calc(5 + 5)' and the bot will give you the correct answer!
* Weather forecast: Type 'Weather "City"' and get the forecast of that "City" for the current day in the state or country you set as default! 

## License
MIT

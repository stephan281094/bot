var SlackBot = require('slackbots')

var bot = new SlackBot({
  token: process.env.BOT_API_KEY,
  name: process.env.BOT_NAME
})

bot.on('start', function () {
  bot.postMessageToChannel('general', 'Hello world!')
})

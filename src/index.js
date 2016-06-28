var SlackBot = require('slackbots')

var bot = new SlackBot({
  token: process.env.BOT_API_KEY,
  name: process.env.BOT_NAME
})

bot.on('message', function (data) {
  if (data.text === 'heeey!') {
    bot.postMessageToChannel('general', 'hoooo!')
  }
})

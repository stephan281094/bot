var SlackBot = require('slackbots')
var config = require('../config/app.js')

var bot = new SlackBot({
  token: config.slack.token,
  name: 'My bot'
})

bot.on('start', function () {
  bot.postMessagetToChannel('general', 'Hello world!')
})

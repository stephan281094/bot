var Botkit = require('botkit')
var controller = Botkit.slackbot()

controller.spawn({
  token: process.env.npm_config_BOT_API_KEY
}).startRTM()

controller.hears(
  'heeey!', ['direct_message', 'direct_mention', 'mention'],
  function (bot, message) {
    bot.reply(message, 'hooo!')
  }
)

controller.hears(
  'calc(.*)', ['direct_message', 'direct_mention', 'mention'],
  function (bot, message) {
    var calculation = message.match[1]

    if (calculation) {
      // TODO: Sanitize calculation
      var answer = eval(calculation)
      bot.reply(message, 'The answer is ' + answer + '!')
    } else {
      bot.reply(message, 'Please provide a valid argument')
    }
  }
)

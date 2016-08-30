var Botkit = require('botkit')
var controller = Botkit.slackbot()

controller.spawn({
  token: process.env.BOT_API_KEY || process.env.npm_config_BOT_API_KEY
}).startRTM()

controller.hears('heeey!', ['direct_message', 'direct_mention', 'mention'],
  function (bot, message) {
    bot.reply(message, 'hooo!')
  }
)

controller.hears('calc(.*)', ['direct_message', 'direct_mention', 'mention'],
  function (bot, message) {
    try {
      var calculation = message.match[1]

      if (calculation) {
        calculation = calculation.replace(/[^-\d/*+.]/g, '')

        var answer = eval(calculation) // eslint-disable-line
        bot.reply(message, 'The answer is ' + answer + '!')
      } else {
        bot.reply(message, 'Please provide a valid argument')
      }
    } catch (e) {
      bot.reply(message, 'I was unable to provide you with an answer, so here\'s a :banana: instead.')
    }
  }
)

controller.hears('yo', ['ambient'], function (bot, message) {
  bot.reply(message, 'yo')
})

var Botkit = require('botkit')
require('env2')('.env')

var controller = Botkit.slackbot()

controller.spawn({
  token: process.env.BOT_API_KEY
}).startRTM()

controller.hears('heeey!', ['direct_message', 'direct_mention', 'mention'],
  function (bot, message) {
    bot.reply(message, 'hooo!')
  });

controller.hears('calculate (.*)', ['direct_message', 'direct_mention', 'mention'],
  function (bot, message) {;
    var calc = message.match[1];
    var result = eval(calc);
    bot.reply(message, result.toString());
  });

var SlackBot = require('slackbots')
require('env2')('.env')

var bot = new SlackBot({
  token: process.env.BOT_API_KEY,
  name: process.env.BOT_NAME
})

bot.on('message', function (data) {
  switch (data.type) {
    case 'message':
      if (data.text === 'heeey!') {
        bot.postMessage(data.channel, 'hooo!')
      }

      break
  }
})

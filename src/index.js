var Botkit = require('botkit')
var controller = Botkit.slackbot()
var http = require('http')
var weatherkey = process.env.WUNDERGROUND_API_KEY || process.env.npm_config_WUNDERGROUND_API_KEY

controller.spawn({
  token: process.env.BOT_API_KEY || process.env.npm_config_BOT_API_KEY
}).startRTM()

controller.hears('heeey!', ['direct_message', 'direct_mention', 'mention'], function (bot, message) {
  bot.reply(message, 'hooo!')
})

controller.hears('calc(.*)', ['direct_message', 'direct_mention', 'mention'], function (bot, message) {
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
})

controller.hears('yo', ['ambient'], function (bot, message) {
  bot.reply(message, 'yo')
})

controller.hears('weather (.*)', ['mention', 'direct_mention', 'direct_message'], function (bot, message) {
  var city = message.match[1]
  var state = process.env.WUNDERGROUND_DEFAULT_STATE || process.env.npm_config_WUNDERGROUND_DEFAULT_STATE
  var url = '/api/' + weatherkey + '/forecast/q/' + state + '/' + city + '.json'

  http.get({
    host: 'api.wunderground.com',
    path: url
  }, function (response) {
    var body = ''
    response.on('data', function (d) {
      body += d
    })
    response.on('end', function () {
      var data = JSON.parse(body)
      var today = data.forecast.simpleforecast.forecastday[0]

      bot.reply(message, today.date.weekday +
      ' high: ' + today.high.celsius +
      ' low: ' + today.low.celsius +
      ' condition: ' + today.conditions)
      switch (today.icon) {
        case 'clear':
        case 'partlycloudy':
        case 'partlysunny':
          bot.reply(message, ':mostly_sunny:')
          break
        case 'chancerain':
          bot.reply(message, ':partly_sunny_rain:')
          break
        case 'mostlycloudy':
        case 'cloudy':
          bot.reply(message, ':cloud:')
          break
        case 'chancesleet':
        case 'chancesnow':
          bot.reply(message, ':snow_cloud:')
          break
        case 'chancetstorms':
        case 'tstorm':
          bot.reply(message, ':thunder_cloud_and_rain:')
          break
        case 'snow':
          bot.reply(message, ':snowflake:')
          break
        default:
          bot.reply(message, 'I wasn\'t able to find an emoij for the current weather :disappointed:, so here\'s a :banana: instead')
      }
    })
  })
})

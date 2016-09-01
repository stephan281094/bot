var Botkit = require('botkit')
var controller = Botkit.slackbot()
var http = require('http')
var weatherkey = process.env.npm_config_WEATHER_API_KEY

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

controller.hears('weather (.*) (.*)', ['mention', 'direct_mention', 'direct_message'], function (bot, message) {
  var city = message.match[1]
  var state = message.match[2] // state can also be a country but use states for the US!
  var url = '/api/' + weatherkey + '/forecast/q/state/city.json'
  url = url.replace('state', state)
  url = url.replace('city', city)

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
      var days = data.forecast.simpleforecast.forecastday
      bot.reply(message, days[1].date.weekday +
      ' high: ' + days[1].high.celsius +
      ' low: ' + days[1].low.celsius +
      ' condition: ' + days[1].conditions)
      switch (days[1].icon) {
        case 'clear':
          bot.reply(message, ':mostly_sunny:')
          break
        case 'partlycloudy':
        case 'partlysunny':
          bot.reply(message, ':mostly_sunny:')
          break
        case 'chancerain':
          bot.reply(message, ':partly_sunny_rain:')
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
          bot.reply(message, 'I was\'nt able to find a emoij for the current weather :disappointed:, so here\'s a :banana: instead ')
      }
    })
  })
})

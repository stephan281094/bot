require('dotenv').config()
const Botkit = require('botkit')
const ns = require('./api/ns')

const controller = Botkit.slackbot()
const ambience = ['direct_message', 'direct_mention', 'mention']

// Initialize the bot
controller.spawn({ token: process.env.SLACK_API_KEY }).startRTM()

// Listen to 'heeey'
controller.hears('heeey!', ambience, (bot, message) => {
  bot.reply(message, 'hooo!')
})

// Fetch a list of departures by station
controller.hears('TREIN (.*)', ambience, (bot, message) => {
  bot.reply(message, ':train2: Fetching departures..')

  const station = message.match[1]
  if (!station) {
    bot.reply(message, ':train2: Please supply a station.')
    return
  }

  ns.getDepartures(station).then((departures) => {
    if (!departures || !departures.length) {
      bot.reply(message, 'No departures found.')
      return
    }

    // Show a list of max 5 departures:
    // 15:23 +2 min Amsterdam Centraal
    departures.slice(0, 5).forEach((dep) => {
      let msg =
        `${getTime(dep.departure)} ` +
        (dep.delayed ? `*${dep.delayed}* ` : '') +
        `${dep.destination}`

      bot.reply(message, msg)
    })
  })
})

function getTime (dateString) {
  const d = new Date(dateString)
  const hours = leftPad(d.getHours(), 2)
  const minutes = leftPad(d.getMinutes(), 2)

  return `${hours}:${minutes}`
}

function leftPad (num, pad) {
  return num.toLocaleString(undefined, {minimumIntegerDigits: pad})
}

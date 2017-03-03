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
controller.hears('train departures (.*)', ambience, (bot, message) => {
  bot.reply(message, ':train2: Fetching departures..')

  const args = message.match[1].split(' ')
  const station = args[0]
  const dest = args[1] || ''

  if (!station) {
    bot.reply(message, ':train2: Please supply a station.')
    return
  }

  ns.getDepartures(station, dest).then((departures) => {
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
  const formatter = new Intl.DateTimeFormat([], {
    timeZone: 'Europe/Amsterdam',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })

  return formatter.format(new Date(dateString))
}

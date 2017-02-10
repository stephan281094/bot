const axios = require('axios')
const { parseString } = require('xml2js')

const getDepartures = function (station) {
  return axios.get(`https://webservices.ns.nl/ns-api-avt?station=${station}`, {
    auth: {
      username: process.env.NS_USER,
      password: process.env.NS_PASS
    }
  }).then(({ data }) => {
    return new Promise((resolve, reject) => {
      parseString(data, (err, result) => {
        if (err) reject(err)

        if (result && result.ActueleVertrekTijden) {
          resolve(
            result.ActueleVertrekTijden.VertrekkendeTrein.map((train) => {
              return {
                destination: train.EindBestemming,
                departure: train.VertrekTijd,
                delayed: train.VertrekVertragingTekst
              }
            })
          )
        }

        // Return with an empty array
        resolve([])
      })
    })
  })
}

module.getDepartures = getDepartures
module.exports = {
  getDepartures
}

const request = require('request')

const getWeather = ({geo, area}, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=11758c941975f355a742f3e52ed1fa7e&query=' + geo + '&units=m'

    request({url: url, json: true}, (err, {body, current = body.current}) => {


        console.log(current)

        if (err) {
            callback('cant connect', undefined)
            return
        }


        if (body.error) {
            callback('cant find address', undefined)
            return
        }

        const message = current.weather_descriptions[0] + ' Its currently ' + current.temperature + ' degress out. There is a ' + current.precip + '% chance of rain.'
        const icon = current.weather_icons[0]

        callback(undefined, {
            area: area,
            message: message,
            icon: icon
        })
    })
}
module.exports = getWeather
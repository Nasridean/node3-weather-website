const request = require('request')

// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/a236ce5c211662a9617e70cc2d107432/' + lat + ',' + long + '?units=si'
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to server.', undefined)
        } else if(body.error) {
            callback(body.error, undefined)
        } else {
            callback(undefined, "The temperature is " + body.currently.temperature)
        } 
    }) 
}


module.exports = forecast
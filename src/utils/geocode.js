const request = require('request')
const geocode = ({query: {adress}}, callback) => {
    const urlGeocoding = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + adress + ".json?access_token=pk.eyJ1IjoibmFzcmlkZWFuIiwiYSI6ImNrNHdzeGRtYTAxcDAzZG5ycmdoMGszNHkifQ.n3as42Ol43Vy76f4YrQmxA"
    request({url: urlGeocoding, json: true}, (error, {body: {features} = {}} = {}) => {
        if(error) {
            callback('Unable to connect to server.', undefined)
        } else if(features.length == 0) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, features[0].center)
        } 
    })
}
module.exports = geocode
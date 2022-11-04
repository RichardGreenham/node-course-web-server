const request = require('request')

const getGeo = (address, callback) => {
    
    const key = 'pk.eyJ1IjoicmljZ3JlZW5oYW0iLCJhIjoiY2p6bzRpOXp6MDU4bjNjbG12d3VwbXZnbCJ9.5pCfUK7lkON2aY_CPGIn_w'
    
    const mapUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=' + key
    
    request({url: mapUrl, json: true}, (err, {body, features = body.features}) => {
    
        if (err) {
            callback('Cant connect !', undefined)
            return
        }
    
        if (features.length > 0) {
            const lat = features[0].center[1]
            const lon = features[0].center[0]
        
            const geo = lat + ',' + lon
        
            const area = features[0].place_name
        
            callback(undefined, {
                geo: geo,
                area, area
            })
        } else {
            callback('Address not found', undefined)
        }
    }) 
}

module.exports = getGeo
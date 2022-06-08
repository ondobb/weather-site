const request = require('request');


const geoCode = (address, callback) => {

    let url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoib25kb2JpbmRhbmciLCJhIjoiY2wzdmc4dDQ3MXJsczNibHRrNDZtb3EyeSJ9.SWYPX3AO4-UTfU8rkCFQGg&limit=1';

    request( {url: url, json: true}, (error, response) => {

        if (error) 
        {
            callback('Unable to connect to location sevices!', undefined);
        }
        else if (response.body.features.length === 0) 
        {
            callback(undefined, 'Unable to find the given location!');

        } else {
            let data = {
                longtitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            } 
            callback(undefined, data);
        }

    });

}

module.exports = geoCode;
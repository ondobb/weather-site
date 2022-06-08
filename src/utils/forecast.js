const request = require('request');


const forecast = (latitude, longtitude, callback) => {

    url = 'http://api.weatherstack.com/current?access_key=4cb8ca4cd127f73c047d63fa562e33d6&query='+ latitude +','+ longtitude;

    request( {url: url, json: true}, (error, response) => {

        if (error) 
        {
            callback('Unable to access the weather service!', undefined);
        }
        else if (response.body.error)
        {
            callback('Unable to find the location!', undefined);
        } else {
            let data = response.body;
            callback(undefined, data.current.weather_descriptions[0] + ". It is currently " + data.current.temperature + ' degress out but it feels like ' + data.current.feelslike + ' degress out. The humidity is ' + data.current.humidity + ' %.');
        }

    } );

}

module.exports = forecast;
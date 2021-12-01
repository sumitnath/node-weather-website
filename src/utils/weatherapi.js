const request = require('postman-request')
//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const forecast= (long,lat,callback) =>{
  const url = 'http://api.weatherstack.com/current?access_key=5eff0bb1b60977ec0f4d7c552b30ea31&query='+encodeURIComponent(lat)+','+encodeURIComponent(long)+'&units=m';
     //dectructing object
  request({url,json:true},(error,{body}={})=>{
    if(error){
      callback('connection error,unable to connect to location server',undefined)
   // }else if(response.body.error){
    }else if(body.error){
      callback('unable to find location',undefined)
     }else{
     callback(undefined,{
    //   // temperature: response.body.current.temperature,
    //   // precip: response.body.current.precip,
    //   // weather_descriptions: response.body.current.weather_descriptions,
    //   // feelslike: response.body.current.feelslike,
    //  weatherReport : 'It is currently ' +response.body.current.temperature + ' celcius their is ' +response.body.current.precip +'% of rain, weather is '+response.body.current.weather_descriptions  + '. It feels like ' +  response.body.current.feelslike +' degree out' 
    weatherReport : 'It is currently ' +body.current.temperature + ' celcius their is ' +body.current.precip +'% of rain, weather is '+body.current.weather_descriptions  + '. It feels like ' +  body.current.feelslike +' degree out'
      })
     }
  })
}

module.exports = forecast

const request = require('postman-request')
const geocodingApi = (address, callback) => {
const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic3VtaXRuYXRoIiwiYSI6ImNrc3praXE4ODJ1M2gyd29kNW9nNWd4ajIifQ.FhqhJJuEqugsbaiSTLJY9w&limit=1'
    //dectructing object
// request({url:url, json:true},(error, response)=>{
  request({url, json:true},(error, {body}={})=>{
   if(error){
   callback('unable to connect to location server',undefined)
   //  }else if(response.body.features.length === 0){
  }else if(body.features.length === 0){
       callback('unable to find the location, Try again', undefined)
     } else{
       callback(undefined,{
      //    location: response.body.features[0].place_name,
      //    latitude:response.body.features[0].center[0],
      //    longitude:response.body.features[0].center[1],
         location: body.features[0].place_name,
         latitude:body.features[0].center[0],
         longitude:body.features[0].center[1]
       })   
     }
  })
}

module.exports = geocodingApi

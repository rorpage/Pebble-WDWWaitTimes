var constants = {
  "ApiBaseUrl": "https://wdwquickinfo.azurewebsites.net",
  
  "ApiUrls": {
    GetAttraction: "/pebble/api/getattraction/",
    GetEntertainment: "/pebble/api/getentertainment/",
    GetFacilities: "/pebble/api/getfacilities",
    GetParkHours: "/basicparkinfo/get?getparksonly=true",
    GetPlans: "/pebble/api/getitinerary/",
    GetRestaurant: "/pebble/api/getrestaurant/",
    GetShop: "/pebble/api/getshop/",
    GetTopAttractionWaitTimes: "/topattractions/get",
    GetWaitTimesByPark: "/waittimes/getbypark?parkId=",
    GetWeather: "/weather/get/wdw",
    GetWhatsNearMe: "/Distance/WhatsNearMe"
  },
  
  locationOptions: {
    enableHighAccuracy: true, 
    maximumAge: 10000, 
    timeout: 10000
  }
};

this.exports = constants;
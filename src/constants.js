var constants = {
  "ApiBaseUrl": "http://now.wdwnt.com",
  
  "ApiUrls": {
    GetAttraction: "/attraction/get/",
    GetFacilities: "/facility/get",
    GetParkHours: "/basicparkinfo/get?getparksonly=true",
    GetRestaurant: "/restaurant/get/",
    GetShop: "/shop/get/",
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
var constants = {
  "ApiBaseUrl": "https://wdwquickinfo.azurewebsites.net",
  
  "ApiUrls": {
    Config: "/pebble/config?timelineusertoken=",
    GetAttraction: "/pebble/api/getattraction/",
    GetEntertainment: "/pebble/api/getentertainment/",
    GetFacilities: "/pebble/api/getfacilities",
    GetMenus: "/pebble/api/getmenus?id=",
    //GetParkHours: "/basicparkinfo/get?getparksonly=true",
    GetParkHours: "/pebble/api/getparkhours",
    GetPlans: "/pebble/api/getitinerary/",
    GetRestaurant: "/pebble/api/getrestaurant/",
    GetShop: "/pebble/api/getshop/",
    GetTopAttractionWaitTimes: "/topattractions/get",
    GetWaitTimesByPark: "/waittimes/getbypark?parkId=",
    GetWeather: "/weather/get/wdw",
    GetWhatsNearMe: "/Distance/WhatsNearMe"
  },
  
  "ParkIds": {
    MagicKingdom: 80007944,
    Epcot: 80007838,
    HollywoodStudios: 80007998,
    AnimalKingdom: 80007823,
    Disneyland: 330339,
    CaliforniaAdventure: 336894
  },
  
  locationOptions: {
    enableHighAccuracy: true, 
    maximumAge: 10000, 
    timeout: 10000
  }
};

this.exports = constants;
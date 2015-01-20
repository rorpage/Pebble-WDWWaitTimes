var API = require('api');
var Constants = require('constants');
var Display = require('display');
var Helpers = require('helpers');
var UI = require('ui');
var Utility = require('utility');

var retriever = {
  getParkHours: function () {
    var callback = function (data) {
      Display.displayParkHours(data, function (parkId) {
        var items = [];
        items.push(
          { title: "Attractions" }, 
          { title: "Restaurants" }, 
          { title: "Shops" }
        );
        
        var menuTitle = Utility.getFacilityName(parkId);
        var mainMenu = new UI.Menu({
          sections: [{
            title: menuTitle,
            items: items
          }]
        });
        
        mainMenu.on('select', function(e) {
          if (e.itemIndex === 0) {
            retriever.getAttractions(parkId);
          } else if (e.itemIndex === 1) {
            retriever.getRestaurants(parkId);
          } else if (e.itemIndex === 2) {
            retriever.getShops(parkId);
          }
        });
    
        mainMenu.show();
      });
    };
    
    API.makeApiCall(Constants.ApiUrls.GetParkHours, callback);
  },
  
  retrieveWaitTimes: function (url) {
    var callback = function (data) {
      Display.displayWaitTimes(data, function (id) {
        retriever.getAttraction(id);
      });
    };
  
    API.makeApiCall(url, callback);  
  },
  
  getTopWaitTimes: function () {
    retriever.retrieveWaitTimes(Constants.ApiUrls.GetTopAttractionWaitTimes);
  },
  
  getWaitTimes: function (parkId) {
    retriever.retrieveWaitTimes(Constants.ApiUrls.GetWaitTimesByPark + parkId);
  },
  
  retrieveFacilities: function (location, facilityType, facilityListMenuTitle, facilityListOnclickCallback) {
    var callback = function (data) {
      Display.displayFacilityList(data, facilityListMenuTitle, function (id) {
        facilityListOnclickCallback(id);
      });
    };
    
    API.makeApiCall(Constants.ApiUrls.GetFacilities + "?location=" + location + "&type=" + facilityType, callback);
  },
  
  getAttractions: function (parkId) {
    retriever.retrieveFacilities(parkId, "Attraction", "Attractions", function (id) {
      retriever.getAttraction(id);
    });
  },
  
  getAttraction: function (id) {
    API.makeApiCall(Constants.ApiUrls.GetAttraction + id, function (data) {
      Display.displayAttraction(data);
    });
  },
  
  getRestaurants: function (parkId) {
    retriever.retrieveFacilities(parkId, "restaurant", "Restaurants", function (id) {
      retriever.getRestaurant(id);
    });
  },
  
  getRestaurant: function (id) {
    API.makeApiCall(Constants.ApiUrls.GetRestaurant + id, function (data) {
      Display.displayRestaurant(data);
    });
  },
  
  getShops: function (parkId) {
    retriever.retrieveFacilities(parkId, "MerchandiseFacility", "Shops", function (id) {
      retriever.getShop(id);
    });
  },
  
  getShop: function (id) {
    API.makeApiCall(Constants.ApiUrls.GetShop + id, function (data) {
      Display.displayShop(data);
    });
  },
  
  getWeather: function () {
    API.makeApiCall(Constants.ApiUrls.GetWeather, function (data) {
      Display.displayWeather(data);
    });
  },
  
  getCurrentPositionForWhatsNearMe: function () {
    navigator.geolocation.getCurrentPosition(
      // success
      function (pos) {
        Helpers.logLocation(pos);
        
        var callback = function (data) {
          var onclickCallback = function (id) {
            retriever.getAttraction(id);
          };
          
          Display.displayWhatsNearMe(data.Attractions, onclickCallback);
        };
        
        //var url = "/Distance/WhatsNearMe?currLat=28.4188341691&currLong=-81.5781962872";
        var url = Constants.ApiUrls.GetWhatsNearMe + "?currLat=" + pos.coords.latitude + "&currLong=" + pos.coords.longitude;
        API.makeApiCall(url, callback);
      },
      // error
      Helpers.logLocationError, 
      // options
      Constants.locationOptions
    );
  }
};

this.exports = retriever;
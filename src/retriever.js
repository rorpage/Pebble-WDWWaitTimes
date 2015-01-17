var API = require('api');
var Constants = require('constants');
var Display = require('display');
var Helpers = require('helpers');

var retriever = {
  getAttraction: function (id) {
    API.makeApiCall(Constants.ApiUrls.GetAttraction + id, function (data) {
      Display.displayAttraction(data);
    });
  },
  
  getParkHours: function () {
    var callback = function (data) {
      Display.displayParkHours(data, function (parkId) {
        retriever.getWaitTimes(parkId);
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
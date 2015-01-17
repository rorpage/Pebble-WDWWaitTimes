var API = require('api');
var Constants = require('constants');
var Display = require('display');
var Helpers = require('helpers');

var retriever = {
  getAttraction: function (id) {
    API.makeApiCall(Constants.ApiUrl.GetAttraction + id, function (data) {
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
  
  getTopWaitTimes: function () {
    var callback = function (data) {
      Display.displayWaitTimes(data, function (id) {
        retriever.getAttraction(id);
      });
    };
    
    API.makeApiCall(Constants.ApiUrls.GetTopAttractionWaitTimes, callback);
  },
  
  getWaitTimes: function (parkId) {
    var callback = function (data) {
      Display.displayWaitTimes(data, function (id) {
        retriever.getAttraction(id);
      });
    };
    
    API.makeApiCall(Constants.ApiUrls.GetWaitTimesByPark + parkId, callback);
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
          Display.displayWhatsNearMe(data, function (id) {
            retriever.getAttraction(id);
          });
        };
        
        // var url = "/Distance/WhatsNearMe?currLat=28.4188341691&currLong=-81.5781962872";
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
var API = require("api");
var Constants = require("constants");
var Display = require("display");
var Helpers = require("helpers");
var Settings = require("settings");
var UI = require("ui");
var Utility = require("utility");

var retriever = {
  getParkHours: function () {
    var callback = function (data) {
      Display.displayParkHours(data, function (parkId) {
        var items = [];
        items.push(
          { title: "Attractions" }, 
          { title: "Entertainment" }, 
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
        
        mainMenu.on("select", function (e) {
          if (e.itemIndex === 0) {
            retriever.getAttractions(parkId);
          } else if (e.itemIndex === 1) {
            retriever.getEntertainments(parkId);
          } else if (e.itemIndex === 2) {
            retriever.getRestaurants(parkId);
          } else if (e.itemIndex === 3) {
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
  
  getRideList: function () {
    var items = [];
        items.push(
          { title: "Magic Kingdom" }, 
          { title: "Epcot" }, 
          { title: "Hollywood Studios" }, 
          { title: "Animal Kingdom" }
        );
    
        var mainMenu = new UI.Menu({
          sections: [{
            title: "Theme Parks",
            items: items
          }]
        });
        
        mainMenu.on('select', function(e) {
          if (e.itemIndex === 0) {
            retriever.getAttractions(80007944);
          } else if (e.itemIndex === 1) {
            retriever.getAttractions(80007838);
          } else if (e.itemIndex === 2) {
            retriever.getAttractions(80007993);
          } else if (e.itemIndex === 3) {
            retriever.getAttractions(80007823);
          }
        });
    
        mainMenu.show();
  },
  
  getDineList: function () {
        var items = [];
        items.push(
          { title: "Magic Kingdom" }, 
          { title: "Epcot" }, 
          { title: "Hollywood Studios" }, 
          { title: "Animal Kingdom" }
        );
    
        var mainMenu = new UI.Menu({
          sections: [{
            title: "Theme Parks",
            items: items
          }]
        });
        
        mainMenu.on('select', function(e) {
          if (e.itemIndex === 0) {
            retriever.getRestaurants(80007944);
          } else if (e.itemIndex === 1) {
            retriever.getRestaurants(80007838);
          } else if (e.itemIndex === 2) {
            retriever.getRestaurants(80007993);
          } else if (e.itemIndex === 3) {
            retriever.getRestaurants(80007823);
          }
        });
    
        mainMenu.show();
  },
  
  getPlans: function () {
    var url = Constants.ApiUrls.GetPlans + 
      "?userid=" + Settings.option("userid") +
      "&apiaccesstoken=" + Settings.option("apiaccesstoken");
    API.makeApiCall(url, function (data) {
      Display.displayPlans(data, function (facility) {
        if (facility.FacilityType === 0) {
          retriever.getAttraction(facility.FacilityId);
        } else if (facility.FacilityType === 2) {
          retriever.getEntertainment(facility.FacilityId);
        } else if (facility.FacilityType === 8) {
          retriever.getRestaurant(facility.FacilityId);
        }
      });
    });
  },
  
  retrieveFacilities: function (location, facilityType, facilityListMenuTitle, facilityListOnclickCallback) {
    var callback = function (data) {
      Display.displayFacilityList(data, facilityListMenuTitle, function (facility) {
        facilityListOnclickCallback(facility);
      });
    };
    
    API.makeApiCall(Constants.ApiUrls.GetFacilities + "?locationId=" + location + "&facilityType=" + facilityType, callback);
  },
  
  getAttractions: function (parkId) {
    retriever.retrieveFacilities(parkId, "Attraction", "Attractions", function (facility) {
      retriever.getAttraction(facility.FacilityId);
    });
  },
  
  getAttraction: function (id) {
    API.makeApiCall(Constants.ApiUrls.GetAttraction + id, function (data) {
      Display.displayFacility(data);
    });
  },
  
  getEntertainments: function (parkId) {
    retriever.retrieveFacilities(parkId, "Entertainment", "Entertainment", function (facility) {
      retriever.getEntertainment(facility.FacilityId);
    });
  },
  
  getEntertainment: function (id) {
    API.makeApiCall(Constants.ApiUrls.GetEntertainment + id, function (data) {
      Display.displayFacility(data);
    });
  },
  
  getRestaurants: function (parkId) {
    var callback = function (facility) {
      var items = [];
      items.push(
        { title: "Info" }, 
        { title: "Menus" }
      );

      var restaurantMenu = new UI.Menu({
        sections: [{
          title: facility.Name,
          items: items
        }]
      });

      restaurantMenu.on('select', function(e) {
        if (e.itemIndex === 0) {
          retriever.getRestaurant(facility.FacilityId);
        } else if (e.itemIndex === 1) {
          retriever.getRestaurantMenu(facility.FacilityId);
        }
      });

      restaurantMenu.show();
    };
    
    retriever.retrieveFacilities(parkId, "restaurant", "Restaurants", callback);
  },
  
  retrieveRestaurant: function (id, isMenu) {
    API.makeApiCall(Constants.ApiUrls.GetRestaurant + id, function (data) {
      Display.displayRestaurant(data, isMenu);
    });
  },
  
  getRestaurant: function (id) {
    retriever.retrieveRestaurant(id, false);
  },
  
  getRestaurantMenu: function (id) {
    retriever.retrieveRestaurant(id, true);
  },
  
  getShops: function (parkId) {
    retriever.retrieveFacilities(parkId, "MerchandiseFacility", "Shops", function (facility) {
      retriever.getShop(facility.FacilityId);
    });
  },
  
  getShop: function (id) {
    API.makeApiCall(Constants.ApiUrls.GetShop + id, function (data) {
      Display.displayFacility(data);
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
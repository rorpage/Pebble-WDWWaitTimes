var Helpers = require('helpers');
var UI = require('ui');
var Utility = require('utility');

var display = {
  displayAttraction: function (data) {
    var description = Utility.cleanseString(data.Description);
    var details = description + "\n\nCurrent status:\n" + data.ShortWaitTimeDisplay;
    Helpers.displayScrollableCard(data.Name, data.Location, details);
  },
  
  displayEntertainment: function (data) {
    var description = Utility.cleanseString(data.Description);
    var todaysSchedule = (data.TodaysSchedulesDisplay === "") ? 
        "Nothing left today" : 
        data.TodaysSchedulesDisplay;
    var details = description + 
        "\n\nToday's schedule:\n" + todaysSchedule;
    Helpers.displayScrollableCard(data.Name, data.Location, details);
  },
  
  displayFacilityList: function (data, menuTitle, onclickCallback) {
    var items = [];
    
    if (data.length === 0) {
      Helpers.displayScrollableCard("None currently listed");
    } else {
      for(var i = 0; i < data.length; i++) {
        var facility = data[i];
        var subtitle = (facility.ShortWaitTimeDisplay) ? 
            facility.ShortWaitTimeDisplay : 
            facility.Location;
        
        items.push({
          title: facility.Name,
          subtitle: subtitle
        });
      }
    
      var resultsMenu = new UI.Menu({
        sections: [{
          title: menuTitle,
          items: items
        }]
      });
    
      resultsMenu.on('select', function(e) {
        var facility = data[e.itemIndex];
        onclickCallback(facility);
      });
    
      resultsMenu.show();
    }
  },
  
  displayParkHours: function (data, onclickCallback) {
    var items = [];
    for(var i = 0; i < data.length; i++) {
      var hours = data[i].TodaysHours
        .replace("<br />", "+ ");
      items.push({
        title: data[i].Name,
        subtitle: hours
      });
    }
  
    var resultsMenu = new UI.Menu({
      sections: [{
        title: "Today's Park Hours",
        items: items
      }]
    });
  
    resultsMenu.on('select', function(e) {
      var park = data[e.itemIndex];
      onclickCallback(park.Id);
    });
  
    resultsMenu.show();
  },
  
  displayRestaurant: function (data, isMenu) {
    if (isMenu) {
      var items = [];
      var sections = [];
      for(var m = 0; m < data.Menus.length; m++) {
        var menu = data.Menus[m];
        for(var i = 0; i < menu.MenuItems.length; i++) {
          var menuItem = menu.MenuItems[i];
          items.push({
            title: menuItem.Name,
            subtitle: menuItem.PriceDisplay
          });
        }
        
        sections.push({
          title: menu.MealPeriodType,
          items: items
        });
        
        items = [];
      }
    
      var resultsMenu = new UI.Menu({ sections: sections }).show();
      resultsMenu.show();
    } else {
      var averageEntreePricesDisplay = "";
      for(var a = 0; a < data.Menus.length; a++) {
        var menuForEntreeAvg = data.Menus[a];
        if (menuForEntreeAvg.AverageEntreePrice !== null) {
          averageEntreePricesDisplay = averageEntreePricesDisplay + 
            menuForEntreeAvg.MealPeriodType + " - " + 
            menuForEntreeAvg.AverageEntreePrice + "\n";
        }
      }
      
      var description = Utility.cleanseString(data.Description);
      var details = description + 
          "\n\nCuisine:\n" + data.Cuisine + 
          "\n\nToday's hours:\n" + data.TodaysHours;
      
      if (averageEntreePricesDisplay !== "") {
        details += "\n\nAverage entrée prices:\n" + averageEntreePricesDisplay;
      }
      
      Helpers.displayScrollableCard(data.Name, data.Location, details);
    }
  },
  
  displayShop: function (data) {
    var description = Utility.cleanseString(data.Description);
    var details = description + 
        "\n\nMerchandise offerings:\n" + data.MerchandiseOfferingsDisplay + 
        "\n\nToday's hours:\n" + data.TodaysHours;
    Helpers.displayScrollableCard(data.Name, data.Location, details);
  },
  
  displayWaitTimes: function (data, onclickCallback) {
    var items = [];
    for(var i = 0; i < data.length; i++) {
      var item = data[i];
      items.push({
        title: item.name,
        subtitle: item.waitTime.shortDisplay
      });
    }
    
    if (items.length === 0) {
      Helpers.displayScrollableCard("None currently listed");
    } else {
      var resultsMenu = new UI.Menu({
        sections: [{
          title: "Current Wait Times",
          items: items
        }]
      });
    
      resultsMenu.on('select', function(e) {
        var item = data[e.itemIndex];
        onclickCallback(item.id);
      });
      
      resultsMenu.show();
    }
  },
  
  displayWeather: function (data) {
    var forecasts = data.Forecasts;
    var text = "Today\n" + forecasts[0].Text + "\n" + forecasts[0].High + "° | " + forecasts[0].Low + "°";
    text += "\n\n";
    text += "Tomorrow\n" + forecasts[1].Text + "\n" + forecasts[1].High + "° | " + forecasts[1].Low + "°";
    text += "\n\n";
    text += forecasts[2].Day + "\n" + forecasts[2].Text + "\n" + forecasts[2].High + "° | " + forecasts[2].Low + "°";
  
    Helpers.displayScrollableCard("Weather", null, text);
  },
    
  displayWhatsNearMe: function (data, onclickCallback) {
    var items = [];
    for(var i = 0; i < data.length; i++) {
      var item = data[i];
      var key = Math.round(Math.abs(item.Key));
  
      items.push({
        title: item.Value.Name,
        subtitle: key + " ft"
      });
    }
  
    if (items.length === 0) {
      Helpers.displayError("We couldn't find anything near you. Are you at a Disney park currently?", "User not in a Disney park");
    } else {
      var resultsMenu = new UI.Menu({
        sections: [{
          title: "What's Near Me?",
          items: items
        }]
      });
  
      resultsMenu.on('select', function(e) {
        var item = data[e.itemIndex];
        onclickCallback(item.Value.Id);
      });
      
      resultsMenu.show();
    }
  }
};

this.exports = display;
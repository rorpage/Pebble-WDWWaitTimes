var Helpers = require("helpers");
var UI = require("ui");

var display = {
  displayFacility: function (data) {
    Helpers.displayScrollableCard(data.Title, data.Subtitle, data.Body);
  },
  
  displayFacilityList: function (data, menuTitle, onclickCallback) {
    var items = [];
    
    if (data.length === 0) {
      Helpers.displayScrollableCard("None currently listed");
    } else {
      for(var i = 0; i < data.length; i++) {
        var facility = data[i];
        items.push({
          title: facility.Name,
          subtitle: facility.Subtitle
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
  
  displayPlans: function (data, onclickCallback) {
    var items = [];
    var days = [];
    if (data.length === 0) {
      Helpers.displayScrollableCard("None currently listed");
    } else {
      for(var d = 0; d < data.length; d++) {
        var day = data[d];
        for(var i = 0; i < day.Items.length; i++) {
          var item = day.Items[i];
          items.push({
            title: item.Name,
            subtitle: item.Subtitle
          });
        }
        
        days.push({
          title: day.Date,
          items: items
        });
        
        items = [];
      }
    
      var resultsMenu = new UI.Menu({
        sections: days
      });
    
      resultsMenu.on("select", function(e) {
        var item = data[e.sectionIndex].Items[e.itemIndex];
        onclickCallback(item);
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
        title: "Today's Hours",
        items: items
      }]
    });
  
    resultsMenu.on("select", function(e) {
      var park = data[e.itemIndex];
      onclickCallback(park.Id);
    });
  
    resultsMenu.show();
  },
  
  displayRestaurant: function (data, isMenu) {
    if (isMenu) {
      var items = [];
      var sections = [];
      for(var m = 0; m < data.Result.length; m++) {
        var menu = data.Result[m];
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
      display.displayFacility(data);
    }
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
var Helpers = require('helpers');
var UI = require('ui');

var display = {
  displayAttraction: function (data) {
    var waitTime = data.WaitTimeDisplay;
    if (waitTime.indexOf("closed") > -1) {
      waitTime = waitTime
      .replace("<span class='closed'>", "")
      .replace("</span>", "");
    }

    var details = data.Description + "\n\nCurrent wait\n" + waitTime;
    Helpers.displayScrollableCard(data.Name, data.Location, details);
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
  
  displayWaitTimes: function (data, onclickCallback) {
    var items = [];
    for(var i = 0; i < data.length; i++) {
      items.push({
        title: data[i].name,
        subtitle: data[i].waitTime.display
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
    var text = 'Today\r\n' + forecasts[0].Text + '\r\n' + forecasts[0].High + '° | ' + forecasts[0].Low + '°';
    text += '\r\n\r\n';
    text += 'Tomorrow\r\n' + forecasts[1].Text + '\r\n' + forecasts[1].High + '° | ' + forecasts[1].Low + '°';
    text += '\r\n\r\n';
    text += forecasts[2].Day + '\r\n' + forecasts[2].Text + '\r\n' + forecasts[2].High + '° | ' + forecasts[2].Low + '°';
  
    Helpers.displayScrollableCard('Weather', null, text);
  },
    
  displayWhatsNearMe: function (data, onclickCallback) {
    var items = [];
    console.log("data.length: " + data.length);
    for(var i = 0; i < data.length; i++) {
      var item = data.Attractions[i];
      var key = Math.round(Math.abs(item.Key));
  
      items.push({
        title: item.Value.Name,
        subtitle: key + " ft"
      });
    }
  
    console.log("items.length: " + items.length);
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
        var item = data.Attractions[e.itemIndex];
        onclickCallback(item.Value.Id);
      });
      
      resultsMenu.show();
    }
  }
};

this.exports = display;
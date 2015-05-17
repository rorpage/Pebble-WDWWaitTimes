var UI = require("ui");
var Vector2 = require("vector2");
var Vibe = require("ui/vibe");

var helpers = {
  shortVibrate: function () {
    Vibe.vibrate("short");
  },
  
  displayScrollableCard: function (title, subtitle, body) {
    var card = new UI.Card({
      title: title,
      subtitle: subtitle,
      body: body,
      scrollable: true
    });
  
    card.show();
  },
  
  displayFacilityWindow: function (name, subtitle, body) {
    var window = new UI.Window({
      backgroundColor: "white",
      scrollable: true
    });
    
    var windowBody = new UI.Text({
      backgroundColor: "white",
      color: "black",
      textOverflow: "fill",
      textAlign: "left",
      position: new Vector2(4, 4),
      size: new Vector2(140, 164),
      text: body
    });
    
    window.add(windowBody);
    window.show();
  },
  
  displayError: function (message, errorToLog) {
    helpers.displayScrollableCard("Uh oh!", null, message);
    console.log(errorToLog);
  },
  
  logLocationError: function (error) {
    console.log("location error (" + error.code + "): " + error.message);
  },
  
  displayMenu: function (title, items) {
    var menu = new UI.Menu({
      sections: [{
        title: title,
        items: items
      }]
    });
        
    menu.show();
  },
  
  logLocation: function (pos) {
    console.log("lat = " + pos.coords.latitude + " lon = " + pos.coords.longitude);
  }
};

this.exports = helpers;
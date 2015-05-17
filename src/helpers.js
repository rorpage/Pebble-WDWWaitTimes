var UI = require("ui");
var Vector2 = require("vector2");
var Vibe = require("ui/vibe");
var WindowUtils = require('ui2/windowUtils');

var helpers = {
  shortVibrate: function () {
    Vibe.vibrate("short");
  },
  
  buildCard: function (text) {
    var splashWindow = new UI.Window();
    
    var uiText = new UI.Text({
      position: new Vector2(0, 46),
      size: new Vector2(144, 15),
      text: text,
      font: "GOTHIC_28_BOLD",
      color: "springBud",
      textOverflow: "wrap",
      textAlign: "center",
      backgroundColor: "black"
    });
    
    splashWindow.add(uiText);
    return splashWindow;
  },
  
  buildLoadingCard: function () {
    return helpers.buildCard("Please wait");
  },
  
  displayScrollableCard: function (title, subtitle, body, titleColor) {
    var card = new UI.Card({
      backgroundColor: "white",
      title: title,
      titleColor: titleColor || "black",
      subtitle: subtitle,
      subtitleColor: "blueMoon",
      body: body,
      bodyColor: "black",
      scrollable: true
    });
  
    card.show();
  },
  
  displayFacilityWindow: function (name, subtitle, body, fullscreen) {
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
      size: new Vector2(WindowUtils.getWindowWidth(fullscreen) - 8, 168),
      text: body
    });
    
    window.add(windowBody);
    window.show();
  },
  
  displayError: function (message, errorToLog) {
    helpers.displayScrollableCard("Uh oh!", null, message, "folly");
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
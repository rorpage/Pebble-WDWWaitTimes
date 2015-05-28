var Constants = require("constants");
var Grid = require("ui2/grid");
var Theme = require("theme");
var UI = require("ui");
var Utility = require("utility");
var Vector2 = require("vector2");
var Vibe = require("ui/vibe");
var WindowUtils = require('ui2/windowUtils');

var helpers = {
  shortVibrate: function() {
    Vibe.vibrate("short");
  },
  
  buildCard: function(text) {
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
  
  buildLoadingCard: function() {
    return helpers.buildCard("Please wait");
  },
  
  buildApliteParkMenu: function(callback) {
    var items = [];
    items.push(
      { title: "Magic Kingdom" }, 
      { title: "Epcot" }, 
      { title: "Hollywood Studios" }, 
      { title: "Animal Kingdom" },
      { title: "Disneyland" },
      { title: "California Adventure" }
    );

    var mainMenu = new UI.Menu({
      sections: [{
        title: "Theme Parks",
        items: items
      }]
    });

    mainMenu.on("select", function(e) {
      if (e.itemIndex === 0) {
        callback(Constants.ParkIds.MagicKingdom);
      } else if (e.itemIndex === 1) {
        callback(Constants.ParkIds.Epcot);
      } else if (e.itemIndex === 2) {
        callback(Constants.ParkIds.HollywoodStudios);
      } else if (e.itemIndex === 3) {
        callback(Constants.ParkIds.AnimalKingdom);
      } else if (e.itemIndex === 4) {
        callback(Constants.ParkIds.Disneyland);
      } else if (e.itemIndex === 5) {
        callback(Constants.ParkIds.CaliforniaAdventure);
      }
    });

    mainMenu.show();
  },
  
  buildBasaltParkMenu: function(callback) {
    var currentIndex, prevIndex = 0;
    var helpbar = new UI.Text({
      text: "WDWNT Now!",
      backgroundColor: Theme.HelpbarBackgroundColor,
      font: "GOTHIC_14",
      position: new Vector2(0, WindowUtils.getWindowHeight(true) - 20),
      size: new Vector2(WindowUtils.getWindowWidth(true), 20)
    });
  
    var gridItems = [];
    gridItems.push(
      { helpbarText: "Magic Kingdom", icon: "images/M-24.png" },
      { helpbarText: "Epcot", icon: "images/E-24.png" },
      { helpbarText: "Hollywood Studios", icon: "images/H-24.png" },
      { helpbarText: "Animal Kingdom", icon: "images/A-24.png" },
      { helpbarText: "Disneyland", icon: "images/D-24.png" },
      { helpbarText: "California Adventure", icon: "images/C-24.png" }
    );
    
    var grid = new Grid({
      fullscreen: true,
      itemsPerRow: 3,
      backgroundColor: Theme.GridBackgroundColor,
      borderSpacing: 1,
      itemDefaultStyle: {
        titleColor: Theme.GridItemTitle,
        backgroundColor: Theme.GridItemBackgroundColor,
        highlightBackgroundColor: Theme.GridItemHighlightBackgroundColor,
        borderWidth: 0
      },
      items: gridItems
    });
    
    var updateHelpbar = function() {
      helpbar.text(gridItems[currentIndex].helpbarText || "");
    };
    
    grid.on("highlight", function(e) {
      prevIndex = currentIndex;
      currentIndex = e.itemIndex;
      updateHelpbar();
    });
    
    grid.on("select", function(e) {
      if (currentIndex === 0) {
        callback(Constants.ParkIds.MagicKingdom);
      } else if (currentIndex === 1) {
        callback(Constants.ParkIds.Epcot);
      } else if (currentIndex === 2) {
        callback(Constants.ParkIds.HollywoodStudios);
      } else if (currentIndex === 3) {
        callback(Constants.ParkIds.AnimalKingdom);
      } else if (currentIndex === 4) {
        callback(Constants.ParkIds.Disneyland);
      } else if (currentIndex === 5) {
        callback(Constants.ParkIds.CaliforniaAdventure);
      }
    });
    
    grid.add(helpbar);
    grid.show();
  },
  
  buildParkMenu: function(callback) {
    if (Utility.isBasalt()) {
      helpers.buildBasaltParkMenu(callback);
    } else {
      helpers.buildApliteParkMenu(callback);
    }
  },
  
  displayScrollableCard: function(title, subtitle, body, titleColor) {
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
  
  displayFacilityWindow: function(name, subtitle, body, fullscreen) {
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
  
  displayError: function(message, errorToLog) {
    helpers.displayScrollableCard("Uh oh!", null, message, "folly");
    console.log(errorToLog);
  },
  
  logLocationError: function(error) {
    console.log("location error (" + error.code + "): " + error.message);
  },
  
  displayMenu: function(title, items) {
    var menu = new UI.Menu({
      sections: [{
        title: title,
        items: items
      }]
    });
        
    menu.show();
  },
  
  logLocation: function(pos) {
    console.log("lat = " + pos.coords.latitude + " lon = " + pos.coords.longitude);
  }
};

this.exports = helpers;
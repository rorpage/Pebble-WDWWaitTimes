var Retriever = require('retriever');
var UI = require('ui');

// Main Menu
var buildAndShowMainMenu = function() {
  var items = [];
  items.push(
    { title: "Hours" }, 
    { title: "Ride" }, 
    { title: "Dine" }, 
    { title: "Plans" }, 
    { title: "Weather" }, 
    { title: "What's Near Me?" }
  );
  
  var mainMenu = new UI.Menu({
    sections: [{
      title: "WDWNT Now!",
      items: items
    }]
  });

  mainMenu.on('select', function(e) {
    if (e.itemIndex === 0) {
      Retriever.getParkHours();
    } else if (e.itemIndex === 1) {
      Retriever.getRideList();
    } else if (e.itemIndex === 2) {
      Retriever.getDineList();
    } else if (e.itemIndex === 3) {
      Retriever.getPlans();
    } else if (e.itemIndex === 4) {
      Retriever.getWeather();
    } else if (e.itemIndex === 5) {
      Retriever.getCurrentPositionForWhatsNearMe();
    }
  });

  mainMenu.show();  
};

buildAndShowMainMenu();
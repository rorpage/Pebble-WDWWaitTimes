var Retriever = require('retriever');
var UI = require('ui');

// Main Menu
var buildAndShowMainMenu = function() {
  var items = [];
  items.push(
    { title: "Today's Park Hours" }, 
    { title: "Top Wait Times" }, 
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
      Retriever.getTopWaitTimes();
    } else if (e.itemIndex === 2) {
      Retriever.getWeather();
    } else if (e.itemIndex === 3) {
      Retriever.getCurrentPositionForWhatsNearMe();
    }
  });

  mainMenu.show();  
};

buildAndShowMainMenu();
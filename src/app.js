var Retriever = require('retriever');
var Settings = require('settings');
var UI = require('ui');

// Main Menu
var buildAndShowMainMenu = function() {
  Pebble.getTimelineToken(
    function (token) {
      console.log("Timeline token: " + token);
    },
    function (error) {
      console.log("Error getting timeline token: " + error);
    }
  );
  
  Settings.option("userid", 1);
  Settings.option("apiaccesstoken", "ae9176bd-6396-43b9-88fd-b38b430ab699");
  
  var items = [];
  items.push(
    { title: "Hours" }, 
    { title: "Ride" }, 
    { title: "Dine" }, 
    { title: "Plans" },
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
      Retriever.getRideList();
    } else if (e.itemIndex === 2) {
      Retriever.getDineList();
    } else if (e.itemIndex === 3) {
      Retriever.getPlans();
    } else if (e.itemIndex === 4) {
      Retriever.getTopWaitTimes();
    } else if (e.itemIndex === 5) {
      Retriever.getWeather();
    } else if (e.itemIndex === 6) {
      Retriever.getCurrentPositionForWhatsNearMe();
    }
  });

  mainMenu.show();  
};

buildAndShowMainMenu();
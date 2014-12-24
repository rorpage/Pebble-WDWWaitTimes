var UI = require('ui');
var Accel = require('ui/accel');
var ajax = require('ajax');
var Vibe = require('ui/vibe');

var parseFeed = function(data, quantity) {
  var items = [];
  for(var i = 0; i < quantity; i++) {
    // Add to menu items array
    items.push({
      title: data[i].name,
      subtitle: data[i].waitTime.display
    });
  }

  return items;
};

var parseWhatsNearMeFeed = function(data, quantity) {
  var items = [];
  for(var i = 0; i < quantity; i++) {
    // Add to menu items array
    
    var item = data.Attractions[i];
    var key = Math.round(Math.abs(item.Key));
    
    items.push({
      title: item.Value.Name,
      subtitle: key + ' ft'
    });
  }

  return items;
};

var getAttraction = function (id) {
  ajax(
    {
      url:'http://now.wdwnt.com/attraction/get/' + id,
      type:'json'
    },
    function(data) {
      var waitTime = data.WaitTimeDisplay;
      if (waitTime.indexOf("closed") > -1) {
        waitTime = waitTime
                      .replace("<span class='closed'>", "")
                      .replace("</span>", "");
      }
      
      var details = data.Description + "\n\nCurrent wait\n" + waitTime;
      var detailCard = new UI.Card({
        title: data.Name,
        subtitle: data.Location,
        body: details,
        scrollable: true
      });
    
      detailCard.show();
    },
    function(error) {
      console.log('Download failed: ' + error);
    }
  );
};

var resultsMenu;
var getWaitTimes = function () {
  ajax(
    {
      url:'http://now.wdwnt.com/topattractions/get',
      type:'json'
    },
    function(data) {
      Vibe.vibrate('short');
      var items = parseFeed(data, data.length);
      resultsMenu = new UI.Menu({
        sections: [{
          title: 'Current Wait Times',
          items: items
        }]
      });
      
      // Register for 'tap' events
      resultsMenu.on('accelTap', function(e) {
        var newItems = getWaitTimes();
        resultsMenu.items(0, newItems);
      });
      
      // Add an action for SELECT
      resultsMenu.on('select', function(e) {
        var item = data[e.itemIndex];
        getAttraction(item.id);
      });
      
      // Show the Menu, hide the splash
      resultsMenu.show();
      //splashWindow.hide();
    },
    function(error) {
      console.log('Download failed: ' + error);
    }
  );
};

var getWhatsNearMe = function () {
  ajax(
    {
      url:'http://now.wdwnt.com/Distance/WhatsNearMe?currLat=28.4188341691&currLong=-81.5781962872',
      type:'json'
    },
    function(data) {
      Vibe.vibrate('short');
      var items = parseWhatsNearMeFeed(data, data.Attractions.length);
      resultsMenu = new UI.Menu({
        sections: [{
          title: 'What\'s Near Me?',
          items: items
        }]
      });
      
      // Add an action for SELECT
      resultsMenu.on('select', function(e) {
        var item = data.Attractions[e.itemIndex];
        getAttraction(item.Value.Id);
      });
      
      // Show the Menu, hide the splash
      resultsMenu.show();
    },
    function(error) {
      console.log('Download failed: ' + error);
    }
  );
};

var buildAndShowMainMenu = function() {
  var items = [];
  items.push({
    title: "What's Near Me?"
  }, {
    title: "Wait Times"
  });
  
  var mainMenu = new UI.Menu({
    sections: [{
      title: 'Walt Disney World',
      items: items
    }]
  });

  // Add an action for SELECT
  mainMenu.on('select', function(e) {
    if (e.itemIndex === 0) {
      getWhatsNearMe();
    } else if (e.itemIndex === 1) {
      getWaitTimes();
    }
  });

  mainMenu.show();  
};

//getWaitTimes();
buildAndShowMainMenu();

// Prepare the accelerometer
Accel.init();
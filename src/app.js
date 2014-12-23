var UI = require('ui');
var Vector2 = require('vector2');
var Accel = require('ui/accel');
var ajax = require('ajax');
var Vibe = require('ui/vibe');

// Show splash screen while waiting for data
var splashWindow = new UI.Window();

// Text element to inform user
var text = new UI.Text({
  position: new Vector2(0, 0),
  size: new Vector2(144, 168),
  text: 'Loading wait times...',
  font: 'GOTHIC_24_BOLD',
  color: 'black',
  textOverflow: 'wrap',
  textAlign: 'left',
	backgroundColor: 'white'
});

// Add to splashWindow and show
splashWindow.add(text);
splashWindow.show();

var resultsMenu;

var parseFeed = function(data, quantity) {
  var items = [];
  for(var i = 0; i < quantity; i++) {
    // Add to menu items array
    items.push({
      title:data[i].name,
      subtitle:data[i].waitTime.display
    });
  }

  // Finally return whole array
  return items;
};

var GetAttraction = function (id) {
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

var GetWaitTimes = function () {
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
        var newItems = GetWaitTimes();
        resultsMenu.items(0, newItems);
      });
      
      // Add an action for SELECT
      resultsMenu.on('select', function(e) {
        var item = data[e.itemIndex];
        GetAttraction(item.id);
      });
      
      // Show the Menu, hide the splash
      resultsMenu.show();
      splashWindow.hide();
    },
    function(error) {
      console.log('Download failed: ' + error);
    }
  );
};

GetWaitTimes();

// Prepare the accelerometer
Accel.init();
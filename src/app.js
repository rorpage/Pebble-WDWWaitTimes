var UI = require('ui');
var ajax = require('ajax');
var Vibe = require('ui/vibe');

var shortVibrate = function() {
  Vibe.vibrate('short');
};

var resultsMenu;

var getAttraction = function (id) {
  ajax(
    {
      url:'http://now.wdwnt.com/attraction/get/' + id,
      type:'json'
    },
    function(data) {
      shortVibrate();
      
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


// Park Hours
var parseParkHours = function(data, quantity) {
  var items = [];
  for(var i = 0; i < quantity; i++) {
    var hours = data[i].TodaysHours
                        .replace("<br />", "+ ");
    items.push({
      title: data[i].Name,
      subtitle: hours
    });
  }

  return items;
};

var getParkHours = function () {
  ajax(
    {
      url:'http://now.wdwnt.com/basicparkinfo/get?getparksonly=true',
      type:'json'
    },
    function(data) {
      shortVibrate();
      
      var items = parseParkHours(data, data.length);
      resultsMenu = new UI.Menu({
        sections: [{
          title: 'Today\'s Park Hours',
          items: items
        }]
      });
      
      resultsMenu.show();
    },
    function(error) {
      console.log('Download failed: ' + error);
    }
  );
};

// Weather
var getWeather = function() {
    ajax(
    {
      url:'http://now.wdwnt.com/weather/get/wdw',
      type:'json'
    },
    function(data) {
      shortVibrate();
      
      var forecasts = data.Forecasts;
      var text = 'Today\r\n' + forecasts[0].Text + '\r\n' + forecasts[0].High + '° | ' + forecasts[0].Low + '°';
      text += '\r\n\r\n';
      text += 'Tomorrow\r\n' + forecasts[1].Text + '\r\n' + forecasts[1].High + '° | ' + forecasts[1].Low + '°';
      text += '\r\n\r\n';
      text += forecasts[2].Day + '\r\n' + forecasts[2].Text + '\r\n' + forecasts[2].High + '° | ' + forecasts[2].Low + '°';
      
      var detailCard = new UI.Card({
        title: 'Weather',
        body: text,
        scrollable: true
      });
    
      detailCard.show();
    },
    function(error) {
      console.log('Download failed: ' + error);
    }
  );
};

// Top Wait Times
var parseWaitTimes = function(data, quantity) {
  var items = [];
  for(var i = 0; i < quantity; i++) {
    items.push({
      title: data[i].name,
      subtitle: data[i].waitTime.display
    });
  }

  return items;
};

var getWaitTimes = function () {
  ajax(
    {
      url:'http://now.wdwnt.com/topattractions/get',
      type:'json'
    },
    function(data) {
      shortVibrate();
      
      var items = parseWaitTimes(data, data.length);
      resultsMenu = new UI.Menu({
        sections: [{
          title: 'Current Wait Times',
          items: items
        }]
      });
      
      resultsMenu.on('select', function(e) {
        var item = data[e.itemIndex];
        getAttraction(item.id);
      });
      
      resultsMenu.show();
    },
    function(error) {
      console.log('Download failed: ' + error);
    }
  );
};

// What's Near Me?
var parseWhatsNearMeFeed = function(data, quantity) {
  var items = [];
  for(var i = 0; i < quantity; i++) {
    var item = data.Attractions[i];
    var key = Math.round(Math.abs(item.Key));
    
    items.push({
      title: item.Value.Name,
      subtitle: key + ' ft'
    });
  }

  return items;
};

var getWhatsNearMe = function () {
  ajax(
    {
      url:'http://now.wdwnt.com/Distance/WhatsNearMe?currLat=28.4188341691&currLong=-81.5781962872',
      type:'json'
    },
    function(data) {
      shortVibrate();
      
      var items = parseWhatsNearMeFeed(data, data.Attractions.length);
      resultsMenu = new UI.Menu({
        sections: [{
          title: 'What\'s Near Me?',
          items: items
        }]
      });
      
      resultsMenu.on('select', function(e) {
        var item = data.Attractions[e.itemIndex];
        getAttraction(item.Value.Id);
      });
      
      resultsMenu.show();
    },
    function(error) {
      console.log('Download failed: ' + error);
    }
  );
};

// Main Menu
var buildAndShowMainMenu = function() {
  var items = [];
  items.push({
    title: "Today's Park Hours"
  }, {
    title: "Wait Times"
  }, {
    title: "Weather"
  }, {
    title: "What's Near Me?"
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
      getParkHours();
    } else if (e.itemIndex === 1) {
      getWaitTimes();
    } else if (e.itemIndex === 2) {
      getWeather();
    } else if (e.itemIndex === 3) {
      getWhatsNearMe();
    }
  });

  mainMenu.show();  
};

buildAndShowMainMenu();
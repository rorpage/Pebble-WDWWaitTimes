var UI = require('ui');
var Vibe = require('ui/vibe');

var helpers = {
  shortVibrate: function () {
    Vibe.vibrate('short');
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
  
  displayError: function (message, errorToLog) {
    helpers.displayScrollableCard("Uh oh!", null, message);
    console.log(errorToLog);
  },
  
  logLocationError: function (error) {
    console.log('location error (' + error.code + '): ' + error.message);
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
    console.log('lat = ' + pos.coords.latitude + ' lon = ' + pos.coords.longitude);
  }
};

this.exports = helpers;
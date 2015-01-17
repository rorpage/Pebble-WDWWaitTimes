var ajax = require('ajax');
var Constants = require('constants');
var Helpers = require('helpers');
var UI = require('ui');

var api = {
  makeApiCall: function (url, successCallback) {
    var card = new UI.Card({
      title: "Loading data..."
    }).show();

    var apiUrl = Constants.ApiBaseUrl + url;
    console.log("Retrieving data from '" + apiUrl + "'...");
    
    ajax(
      { url: apiUrl, type: 'json' },
      function (data) {
        card.hide();
        Helpers.shortVibrate();
        successCallback(data);
      },
      function (error) {
        card.hide();
        Helpers.displayError("Couldn't load data. Please try again.", "Download failed: " + error);
      }
    );
  }
};

this.exports = api;
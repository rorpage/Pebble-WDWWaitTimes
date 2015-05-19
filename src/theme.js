var Utility = require("utility");

var isBasalt = Utility.isBasalt();
var theme = {
  GridBackgroundColor: isBasalt ? "white" : "clear",
  GridItemBackgroundColor: isBasalt ? "darkGray" : "clear",
  GridItemHighlightBackgroundColor: isBasalt ? "orange" : "black",
  GridItemTitle: "white",
  HelpbarBackgroundColor: isBasalt ? "blueMoon" : "black",
  SubtitleColor: isBasalt ? "blueMoon" : "black"
};

this.exports = theme;
var utility = {
  getFacilityName: function (facilityId) {
    // WDW
    if (facilityId === 80007944) {
      return "Magic Kingdom";
    } else if (facilityId === 80007838) {
      return "Epcot";
    } else if (facilityId === 80007998) {
      return "Hollywood Studios";
    } else if (facilityId === 80007823) {
      return "Animal Kingdom";
    } else if (facilityId === 80007981) {
      return "Typhoon Lagoon";
    } else if (facilityId === 80007834) {
      return "Blizzard Beach";
    } else if (facilityId === 80008259) {
      return "Disney's Boardwalk";
    } else if (facilityId === 10460) {
      return "Downtown Disney";
    } else if (facilityId === 80008033) {
      return "ESPN Wide World of Sports";
    // DLR
    } else if (facilityId === 330339) {
      return "Disneyland";
    } else if (facilityId === 336894) {
      return "Disney California Adventure";
    }
  },
  
  replaceAll: function (find, replace, str) {
    return str.replace(new RegExp(find, 'g'), replace);
  },
  
  cleanseString: function (string) {
    var clean = utility.replaceAll("<em>", "\"", string);
    clean = utility.replaceAll("</em>", "\"", clean);
    clean = utility.replaceAll("<br/>", "", clean);
    clean = utility.replaceAll("\"and\"", "and", clean);
    return clean;
  }
};

this.exports = utility;
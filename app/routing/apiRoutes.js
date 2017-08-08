var friends = require("../data/friends");

module.exports = function(app) {
  // Getting all available friends in friends.js as JSON
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {
    console.log(req.body.scores);

    // Getting all user details
    var user = req.body;

    // parseInt for match scores
    for(var i = 0; i < user.scores.length; i++) {
      user.scores[i] = parseInt(user.scores[i]);
    }

    // default friend match is the first friend
    var bestFriendIndex = 0;
    var minDifference = 50;

    // Calculating differences
    for(var i = 0; i < friends.length; i++) {
      var totalDifference = 0;
      for(var j = 0; j < friends[i].scores.length; j++) {
        var difference = Math.abs(user.scores[j] - friends[i].scores[j]);
        totalDifference += difference;
      }

      // if there is a new minimum, change the best friend index and set the new minimum
      if(totalDifference < minDifference) {
        bestFriendIndex = i;
        minDifference = totalDifference;
      }
    }

    // Adding user to friend array
    friends.push(user);

    // receive best friend match
    res.json(friends[bestFriendIndex]);
  });
};
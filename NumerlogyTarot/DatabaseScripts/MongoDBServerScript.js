//files and localhost connection to work with
var mongodb = require("mongodb");
var url = "mongodb://localhost:27017";

exports.FindUserDetails = function(username) {
  var MongoClient = mongodb.MongoClient;
  MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
    if (err) {
      console.log("\n\n" + err + "\n\n");
      db.close();
      return "";
    } else {
      var database = db.db("NumerlogyTarotDB");
      console.log("Connected to the database NumerlogyTarotDB");
      //the collection to connect to
      var collection = database.collection("users");
      console.log("Connected to the collections users");

      collection.find({ username: username }).toArray(function(err, result) {
        if (err) throw err;
        else {
          console.log(result);
        }
      });
      //var myCursor = collection.find({ username: username }).max(1);

      var item = collection.find({ username: username }).max(1);

      //myCursor.hasNext() ? myCursor.next() : null;
      console.log("Items found: " + item);
      db.close();
      return item;
    }
  });
};

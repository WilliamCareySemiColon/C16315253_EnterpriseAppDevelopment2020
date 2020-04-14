//files and localhost connection to work with
var mongodb = require("mongodb");
var url = "mongodb://localhost:27017";

function FindUserDetails(username) {
  db = GetCollection();
  if (db === "") {
    return db;
  } else {
    var database = db.db("NumerlogyTarotDB");
    console.log("Connected to the database NumerlogyTarotDB");
    //the collection to connect to
    var collection = database.collection("users");
    console.log("Connected to the collections users");
    //find the user using the key username followed by parameter username
    var item = collection.find({ username: username });
    db.close();
    return item;
  }
}

function GetCollection() {
  var MongoClient = mongodb.MongoClient;
  MongoClient.connect(url, function(err, db) {
    if (err) {
      db.close();
      return "";
    } else {
      return db;
    }
  });
}

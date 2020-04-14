var mongodb = require("mongodb");

var collectionToInsert = [
  {
    _id: "Will19011998",
    username: "Will19011998",
    name: "William",
    middlename: "Michael Thomas",
    surname: "Carey",
    DOB: "19/01/1998",
    password: "password"
  },
  {
    _id: "Noel2468",
    username: "Noel2468",
    name: "Noel",
    middlename: "",
    surname: "Carey",
    DOB: "02/12/1966",
    password: "fitgoals"
  },
  {
    _id: "supersue1234",
    username: "supersue1234",
    name: "Susan",
    middlename: "",
    surname: "Carey",
    DOB: "28/01/1971",
    password: "autism"
  },
  {
    _id: "mick09101996",
    username: "mick09101996",
    name: "Michael",
    middlename: "William",
    surname: "Carey",
    DOB: "09/10/1996",
    password: "dinosuar"
  }
];

//mongo files and connections
var MongoClient = mongodb.MongoClient;
var url = "mongodb://localhost:27017";

MongoClient.connect(url, function(err, db) {
  if (err) {
    db.close();
    throw err;
  } else {
    console.log("Connected to the mongo server on localhost 27017");
    var database = db.db("NumerlogyTarotDB");
    console.log("Connected to the database NumerlogyTarotDB");
    var collection = database.collection("users");
    console.log("Connected to the collections users");
    collection.insertMany(collectionToInsert);
    console.log("writing to the collection");
    db.close();
    console.log("DB work is completed");
  }
});

//db.close();

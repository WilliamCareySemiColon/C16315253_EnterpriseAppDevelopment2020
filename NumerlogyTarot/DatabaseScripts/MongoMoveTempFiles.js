//javascript code to get the sammple data into the system
var mongodb = require("mongodb");
var bcrypt = require("bcrypt");
//the salts for the hashing of the password
const saltRounds = 10;

var Will19011998password = "6Y4w7c4M;";
var Noel2468password = "fitgoals1234;";
var supersue1234password = "autism1234;";
var mick09101996password = "dino1234;";

//insert into the database, step by step
//William
bcrypt.hash(Will19011998password, saltRounds, function (err, hash) {
  if (err) {
    console.log(err);
  }
  var hashedpass = hash;
  console.log(hashedpass);

  var doc = {
    _id: "Will19011998",
    username: "Will19011998",
    name: "William",
    middlename: "Michael Thomas",
    surname: "Carey",
    DOB: "19/01/1998",
    password: hashedpass,
  };

  InsertIntoMongo(doc);
});

//Noel
bcrypt.hash(Noel2468password, saltRounds, function (err, hash) {
  if (err) {
    console.log(err);
  }
  var hashedpass = hash;
  console.log(hashedpass);

  var doc = {
    _id: "Noel2468",
    username: "Noel2468",
    name: "Noel",
    middlename: "",
    surname: "Carey",
    DOB: "02/12/1966",
    password: hashedpass,
  };

  InsertIntoMongo(doc);
});

//sue
bcrypt.hash(supersue1234password, saltRounds, function (err, hash) {
  if (err) {
    console.log(err);
  }
  var hashedpass = hash;
  console.log(hashedpass);

  var doc = {
    _id: "supersue1234",
    username: "supersue1234",
    name: "Susan",
    middlename: "",
    surname: "Carey",
    DOB: "28/01/1971",
    password: hashedpass,
  };

  InsertIntoMongo(doc);
});

bcrypt.hash(mick09101996password, saltRounds, function (err, hash) {
  if (err) {
    console.log(err);
  }
  var hashedpass = hash;
  console.log(hashedpass);

  var doc = {
    _id: "mick09101996",
    username: "mick09101996",
    name: "Michael",
    middlename: "William",
    surname: "Carey",
    DOB: "09/10/1996",
    password: hashedpass,
  };

  InsertIntoMongo(doc);
});

// var collectionToInsert = [
//   {
//     _id: "Will19011998",
//     username: "Will19011998",
//     name: "William",
//     middlename: "Michael Thomas",
//     surname: "Carey",
//     DOB: "19/01/1998",
//     password: "password",
//   },
//   {
//     _id: "Noel2468",
//     username: "Noel2468",
//     name: "Noel",
//     middlename: "",
//     surname: "Carey",
//     DOB: "02/12/1966",
//     password: "fitgoals",
//   },
//   {
//     _id: "supersue1234",
//     username: "supersue1234",
//     name: "Susan",
//     middlename: "",
//     surname: "Carey",
//     DOB: "28/01/1971",
//     password: "autism",
//   },
//   {
//     _id: "mick09101996",
//     username: "mick09101996",
//     name: "Michael",
//     middlename: "William",
//     surname: "Carey",
//     DOB: "09/10/1996",
//     password: "dinosuar",
//   },
// ];

function InsertIntoMongo(data) {
  //mongo files and connections
  var MongoClient = mongodb.MongoClient;
  var url = "mongodb://localhost:27017";

  MongoClient.connect(url, { useUnifiedTopology: true }, async function (
    err,
    db
  ) {
    if (err) {
      db.close();
      throw err;
    } else {
      console.log("Connected to the mongo server on localhost 27017");
      //the database needed to connect to
      var database = await db.db("NumerlogyTarotDB");
      console.log("Connected to the database NumerlogyTarotDB");
      //the collection to connect to
      var collection = await database.collection("users");
      console.log("Connected to the collections users");
      //inserting the sample data created above
      await collection.insertOne(data);
      console.log("writing to the collection");
      db.close();
      console.log("DB work is completed");
    }
  });
}

// //mongo files and connections
// var MongoClient = mongodb.MongoClient;
// var url = "mongodb://localhost:27017";

// MongoClient.connect(url, { useUnifiedTopology: true }, async function (
//   err,
//   db
// ) {
//   if (err) {
//     db.close();
//     throw err;
//   } else {
//     console.log("Connected to the mongo server on localhost 27017");
//     //the database needed to connect to
//     var database = await db.db("NumerlogyTarotDB");
//     console.log("Connected to the database NumerlogyTarotDB");
//     //the collection to connect to
//     var collection = await database.collection("users");
//     console.log("Connected to the collections users");
//     //inserting the sample data created above
//     await collection.insertMany(collectionToInsert);
//     console.log("writing to the collection");
//     db.close();
//     console.log("DB work is completed");
//   }
// });

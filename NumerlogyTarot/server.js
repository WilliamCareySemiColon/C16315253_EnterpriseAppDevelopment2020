//all the javascript files for the server
var express = require("express");
var http = require("http");
var app = express();
var fs = require("fs");
var path = require("path");
var HttpMsgs = require("http-msgs");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var mongoose = require("mongoose");

//personal require files
var MongodDBServer = require("./DatabaseScripts/MongoDBServerScript.js");

//default location for the application
app.use(express.static(path.join(__dirname + "/view")));
//app.use(bodyParser);
//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(app.router);
//app.use(express.bodyParser());
//app.use(bodyParser.json());
//app.use(express.json());
//app.use(express.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));

// Create our Express-powered HTTP server and have it listen on port 7777
http.createServer(app).listen(7777, function() {
  console.log("Listening on port 7777");
});

//creating the connections to the database
mongoose.connect("mongodb://localhost:27017/NumerlogyTarotDB");
var scehma = new mongoose.Schema({
  _id: "String",
  username: "String",
  name: "String",
  middlename: "String",
  surname: "String",
  DOB: "String",
  password: "String"
});

var users = mongoose.model("users", scehma);

// set up our routes
app.get("/hello", function(req, res) {
  // no need to set up HTTP headers
  res.send("Hello World 1234!");
});
// simply using res.send instead of res.write and res.end
app.get("/goodbye", function(req, res) {
  res.send("Goodbye World!");
});

app.get("/", function(req, res) {
  let filename = "./index.html";
  fs.readFile(filename, function(err, data) {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/html" });
      return res.end("404 Not Found");
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    }
  });
});

//test method
// app.post("/endpoint", function(req, res) {
//   var url = "mongodb://localhost:27017";
//   var MongoClient = mongodb.MongoClient;

//   console.log("body: " + req.body.username + " " + req.body.password);

//   MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
//     if (err) {
//       console.log("\n\n" + err + "\n\n");
//       db.close();
//     } else {
//       var database = db.db("NumerlogyTarotDB");
//       console.log("Connected to the database NumerlogyTarotDB");
//       //the collection to connect to
//       var collection = database.collection("users");
//       console.log("Connected to the collections users");

//       console.log(collection.find({ username: req.body.username }));

//       // collection.find({ username: username }).toArray(function(err, result) {
//       //   if (err) throw err;
//       //   else {
//       //     console.log(result);
//       //   }
//       // });
//       //var myCursor = collection.find({ username: username }).max(1);
//       //var item = collection.find({ username: req.body.username }).max(1);
//       var item = collection.find().max(1);

//       //myCursor.hasNext() ? myCursor.next() : null;
//       console.log("Items found: " + item);
//       db.close();
//       //res.send(req.body);
//       HttpMsgs.sendJSON(req, res, {
//         items: item.toString()
//       });
//     }
//   });

//var item = MongodDBServer.FindUserDetails(req.body.username);

//console.log("items sent to front end: " + item);
//});

//test method
app.post("/endpoint", function(req, res) {
  console.log("body: " + req.body.username + " " + req.body.password);

  users.find({ username: req.body.username }, function(err, docs) {
    if (err) {
      console.log(error);
    } else {
      HttpMsgs.sendJSON(req, res, {
        items: docs
      });
    }
  });
  // HttpMsgs.sendJSON(req, res, {
  //   items: item.toString()
  // });
});

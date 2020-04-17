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
var expressSession = require("express-session");

//creating the session for inital use
app.use(expressSession({ secret: "sssshhhhh" }));
// , function () {
//   console.log("Sessions are usable in application");
// });
//default location for the application
app.use(express.static(path.join(__dirname + "/view")));

app.use(express.urlencoded({ extended: false }));
// Create our Express-powered HTTP server and have it listen on port 7777
http.createServer(app).listen(7777, function () {
  console.log("Listening on port 7777");
});

//creating the connections to the database
mongoose.connect(
  "mongodb://localhost:27017/NumerlogyTarotDB",
  //{ useNewUrlParser: true },
  { useUnifiedTopology: true, useNewUrlParser: true }
);
//creating the schema for reading the data
var scehma = new mongoose.Schema({
  _id: "String",
  username: "String",
  name: "String",
  middlename: "String",
  surname: "String",
  DOB: "String",
  password: "String",
});
//creating the connection to the collection itself
var users = mongoose.model("users", scehma);

//setting the routes to the application
app.get("/", function (req, res) {
  let filename = "./index.html";
  fs.readFile(filename, function (err, data) {
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

//the method to get the user details with the mongodb server and check them to see if they're correct
app.post("/checkuserdetails", function (req, res) {
  var sess = req.session;
  //allow session to last three months
  //sess.cookie.maxAge = 92*24 * 60 * 60 * 1000
  //allow session to last a day
  sess.cookie.maxAge = 24 * 60 * 60 * 1000;
  // This user should log in again after restarting the browser
  sess.cookie.expires = false;
  var StableDocs;

  //console.log("body: " + req.body.username + " " + req.body.password);

  users.find({ username: req.body.username }, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      StableDocs = docs;
      if (StableDocs[0] !== undefined) {
        sess.username = req.body.username;
        sess.password = req.body.password;
        sess.firstname = StableDocs[0].name;
        sess.mname = StableDocs[0].middlename;
        sess.surname = StableDocs[0].surname;
        sess.DOB = StableDocs[0].DOB;
      }

      console.log(sess);

      HttpMsgs.sendJSON(req, res, {
        items: docs,
      });
    }
  });
});

//the login function working
app.get("/login", function (req, res) {
  //console.log("area is successfully called");
  let filename = "./view/home.html";
  fs.readFile(filename, function (err, data) {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/html" });
      return res.end("404 Not Found");
    } else {
      res.writeHead(
        200,
        { "Content-Type": "text/html" },
        { Location: "http://localhost:7777/login" }
      );
      res.write(data);
      return res.end();
    }
    //res.redirect allows the app to redirect to a different page
  });
});

//register the users into the application
app.post("/register", function (req, res) {
  var sess = req.session;
  //variables to take in the details of the user into the application
  var _id = req.body.username;
  var username = req.body.username;
  var fname = req.body.fname;
  var mname = req.body.mname;
  var lname = req.body.lname;
  var DOB = req.body.DOB;
  var password = req.body.password;

  var registerUser = {
    _id: _id,
    username: username,
    name: fname,
    middlename: mname,
    surname: lname,
    DOB: DOB,
    password: password,
  };

  //console.log(registerUser);
  //mongo files and connections
  var MongoClient = mongodb.MongoClient;
  var url = "mongodb://localhost:27017";

  MongoClient.connect(url, { useUnifiedTopology: true }, async function (
    err,
    db
  ) {
    if (err) {
      db.close();
      HttpMsgs.sendJSON(req, res, {
        items: "failure " + err,
      });
      //throw err;
    } else {
      console.log("Connected to the mongo server on localhost 27017");
      //the database needed to connect to
      var database = await db.db("NumerlogyTarotDB");
      console.log("Connected to the database NumerlogyTarotDB");
      //the collection to connect to
      var collection = await database.collection("users");
      console.log("Connected to the collections users");
      //inserting the sample data created above
      var docs = await collection.insertOne(registerUser);
      console.log("writing to the collection");
      console.log("\n\nresult " + docs);

      db.close();
      //appending the information to the session too
      sess.username = username;
      sess.password = password;
      sess.firstname = fname;
      sess.mname = mname;
      sess.surname = lname;
      sess.DOB = DOB;
      //sending the information back to the client
      HttpMsgs.sendJSON(req, res, {
        items: "success in inserting data into database",
      });
    }
  });
});

//redirect to the details
app.get("/ViewAccount", function (req, res) {
  let filename = "./view/ViewAccount.html";
  fs.readFile(filename, function (err, data) {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/html" });
      return res.end("404 Not Found");
    } else {
      es.writeHead(
        200,
        { "Content-Type": "text/html" },
        { Location: "http://localhost:7777/login" }
      );
      res.write(data);
      return res.end();
    }
  });
});
//getting the user details to the server
app.post("/GetUserDetails", function (req, res) {
  var sess = req.session;

  if (sess.username) {
    var doc = {
      username: sess.username,
      password: sess.password,
      firstname: sess.firstname,
      mname: sess.mname,
      surname: sess.surname,
      DOB: sess.DOB,
    };
    HttpMsgs.sendJSON(req, res, {
      items: doc,
    });
  } else {
    res.redirect("/");
  }
});

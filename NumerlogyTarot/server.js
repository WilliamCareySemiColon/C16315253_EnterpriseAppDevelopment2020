/************************************************************************************
 * All the javascript libary files to get access for the functionality of the server
 ************************************************************************************/
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

/******************************************************************************************
 * The configuration of the files used by the server, including the creation of the server,
 * The application used and other key configruations
 ******************************************************************************************/

//creating the session for inital use
app.use(expressSession({ secret: "sssshhhhh" }));

app.use(express.static(path.join(__dirname + "/view")));

app.use(express.urlencoded({ extended: false }));
// Create our Express-powered HTTP server and have it listen on port 7777
http.createServer(app).listen(7777, function () {
  console.log("Listening on port 7777");
});

//creating the connections to the database
mongoose.connect(
  "mongodb://localhost:27017/NumerlogyTarotDB",
  { useUnifiedTopology: true, useNewUrlParser: true },
  function () {
    console.log('\n\nConnected to mongo database "NumerlogyTarotDB" \n\n');
  }
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

/**********************************************************************************************
 * The redirection of the routes for the server, where the server uses to connect to the
 * different pages of the web application
 **********************************************************************************************/

//setting the routes to the application and the directions to the three pages
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

//redirect to the view account details
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
//end of the page redirection section

/**********************************************************************************************
 * The crud section of the web application, which, in order, is the Read, Create, update and
 * delete sections of the application
 ***********************************************************************************************/

//the method to get the user details with the mongodb server and check them to see if they're correct
app.post("/checkuserdetails", function (req, res) {
  //capture the current version of the sessions
  var sess = req.session;
  var StableDocs;

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

//the function to update the user details
app.post("/UpdateUserAccountDetails", function (req, res) {
  var sess = req.session;
  var username = req.body.username;
  var firstname = req.body.firstname;
  var middlename = req.body.middlename;
  var surname = req.body.surname;
  var DOB = req.body.DOB;
  var password = req.body.password;

  users.findOne({ username: username }, async function (err, doc) {
    if (err) {
      console.log(err);
    } else {
      doc.name = firstname;
      doc.middlename = middlename;
      doc.surname = surname;
      doc.DOB = DOB;
      doc.password = password;

      await doc.save();

      sess.password = password;
      sess.firstname = fname;
      sess.mname = middlename;
      sess.surname = surname;
      sess.DOB = DOB;

      HttpMsgs.sendJSON(req, res, {
        items: doc,
      });
    }
  });
});

app.post("/deleteAccount", function (req, res) {
  var sess = req.session;
  var username = req.body.username;

  users.findOneAndDelete({ username: username }, function (err, doc) {
    if (err) {
      console.log(err);
    } else {
      doc.save();
      sess.destroy();
      res.redirect("/");
    }
  });
});

/**************************************************************************************************
 * Other section of the application functionality, which both includes getting the user details
 * from the session and the logout. More on the way
 *************************************************************************************************/

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

app.post("/logout", function (req, res) {
  var sess = req.session;
  sess.destroy();
  res.redirect("/");
});

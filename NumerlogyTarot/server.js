/************************************************************************************
 * All the javascript libary files to get access for the functionality of the server
 ************************************************************************************/
//all the javascript files for the server
var express = require("express");
var http = require("http");
var https = require("https");
var app = express();
var fs = require("fs");
var path = require("path");
var HttpMsgs = require("http-msgs");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var mongoose = require("mongoose");
var expressSession = require("express-session");
var bcrypt = require("bcrypt");
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

//the salts for the hashing of the password
const saltRounds = 10;

/***********************************************************************************************************
 * The REST API CONNECTION to the TAROT API. Get the major archanas from the application and set them into
 * a variable to be read from later as part of the numerlogy and tarot application
 *
 * This is the confugruation section
 **********************************************************************************************************/

//get all the major acadna cards from the api
var JSONObject = {};
var flag = false;

//the url which the code can be found
//https://nodejs.org/api/http.html#http_http_get_options_callback
http
  .get(
    "http://rws-cards-api.herokuapp.com/api/v1/cards/search?type=major",
    (res) => {
      console.log(
        "Requesting information from the site" +
          " http://rws-cards-api.herokuapp.com/api/v1/cards/search?type=major"
      );
      const { statusCode } = res;
      const contentType = res.headers["content-type"];
      //console.log(res);
      let error;
      if (statusCode !== 200) {
        error = new Error("Request Failed.\n" + `Status Code: ${statusCode}`);
      } else if (!/^application\/json/.test(contentType)) {
        error = new Error(
          "Invalid content-type.\n" +
            `Expected application/json but received ${contentType}`
        );
      }
      if (error) {
        console.error(error.message);
        // Consume response data to free up memory
        res.resume();
        return;
      }

      res.setEncoding("utf8");
      let rawData = "";
      res.on("data", (chunk) => {
        rawData += chunk;
      });
      res.on("end", () => {
        try {
          const parsedData = JSON.parse(rawData);
          //assign to the global variable - this is the only write section
          JSONObject = parsedData;
          //console.log(JSONObject);
          flag = true;
        } catch (e) {
          console.error(e.message);
        }
      });
    }
  )
  .on("error", (e) => {
    console.error(`Got error: ${e.message}`);
  });

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
        { Location: "http://localhost:7777/ViewAccount" }
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

  console.log(req.body);

  var password = "";

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

        password = req.body.password;
      }

      console.log(sess);
      var docPass = "";

      if (StableDocs[0] !== undefined) {
        docPass = StableDocs[0].password;
      }

      //console.log(StableDocs[0].password);

      var ReturnDocs = docs;

      bcrypt.compare(password, docPass).then(function (result) {
        console.log(result);
        if (result) {
          ReturnDocs[0].password = req.body.password;
        }
        HttpMsgs.sendJSON(req, res, {
          items: ReturnDocs,
        });
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

  bcrypt.hash(password, saltRounds, function (err, hash) {
    if (err) {
      console.log(err);
    }
    var hashedpass = hash;
    console.log(hashedpass);

    var registerUser = {
      _id: _id,
      username: username,
      name: fname,
      middlename: mname,
      surname: lname,
      DOB: DOB,
      password: hashedpass,
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

  bcrypt.hash(password, saltRounds, function (err, hash) {
    if (err) {
      console.log(err);
    }
    var hashedpass = hash;
    console.log(hashedpass);

    users.findOne({ username: username }, async function (err, doc) {
      if (err) {
        console.log(err);
      } else {
        doc.name = firstname;
        doc.middlename = middlename;
        doc.surname = surname;
        doc.DOB = DOB;
        doc.password = hashedpass;

        await doc.save();

        sess.password = password;
        sess.firstname = firstname;
        sess.mname = middlename;
        sess.surname = surname;
        sess.DOB = DOB;

        HttpMsgs.sendJSON(req, res, {
          items: doc,
        });
      }
    });
  }); //end the update method
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

/**************************************************************************************************************
 * Make the rest call to the api worked with. The url for the description of the rest architecture is at the
 * following: https://github.com/ekelen/tarot-api
 **************************************************************************************************************/

app.post("/GetTarotDetails", async function (req, res) {
  var sess = req.session;

  var numberPara = req.body.number;

  if (numberPara === 0) {
    numberPara = 21;
  }

  var objectToReturn = flag ? JSONObject.cards[numberPara - 1] : null;

  HttpMsgs.sendJSON(req, res, {
    items: objectToReturn,
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

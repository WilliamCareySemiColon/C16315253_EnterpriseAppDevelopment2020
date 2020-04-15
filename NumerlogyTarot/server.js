//all the javascript files for the server
var express = require("express");
var http = require("http");
var app = express();
var fs = require("fs");
var path = require("path");
var HttpMsgs = require("http-msgs");
var bodyParser = require("body-parser");
//var mongodb = require("mongodb");
//personal require files
var MongodDBServer = require("./DatabaseScripts/MongoDBServerScript");

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
app.post("/endpoint", function(req, res) {
  console.log("body: " + req.body.title);

  //res.send(req.body);
  HttpMsgs.sendJSON(req, res, {
    from: "server"
  });
});

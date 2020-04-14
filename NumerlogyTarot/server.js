//all the javascript files for the server
var express = require("express");
var http = require("http");
var app = express();
var fs = require("fs");
var path = require("path");
var mongodb = require("mongodb");

//default location for the application
app.use(express.static(path.join(__dirname + "/view")));

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

//mongo files and connections
var MongoClient = mongodb.MongoClient;
var url = "mongodb://localhost:27017";

MongoClient.connect(url, function(err, db) {
  if (err) {
    throw err;
  } else {
    console.log("Connected");
    db.close();
  }
});

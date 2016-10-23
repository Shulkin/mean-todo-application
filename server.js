// require modules
var express = require("express");
var mongoose = require("mongoose");
var morgan = require("morgan"); // log requests to the console
var bodyParser = require("body-parser"); // pull information from HTML POST
var methodOverride = require("method-override"); // simulate DELETE and PUT

// init express app
var app = express();

// connect to database
mongoose.connect("mongodb://localhost:27017/todo_db")

// configuration
app.use(express.static(__dirname + "/public"));
app.use(morgan("dev")); // log every request to the console
app.use(podyParser.json()); // parse application/json
// parse application/vnd.api+json as json
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({"extended": "true"}));
app.use(methodOverride());

// listen port 3000
app.listen(3000);
console.log("Server started at port 3000");

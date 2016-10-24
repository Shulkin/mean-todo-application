// require modules
var express = require("express");
var mongoose = require("mongoose");
var morgan = require("morgan"); // log requests to the console
var bodyParser = require("body-parser"); // pull information from HTML POST
var methodOverride = require("method-override"); // simulate DELETE and PUT

// init express app
var app = express();
// set the port
var port = process.env.PORT || 3000;

// load the database config
var database = require("./config/database");
// connect to database
mongoose.connect(database.url);

// configuration
app.use(express.static(__dirname + "/public"));
app.use(morgan("dev")); // log every request to the console
app.use(bodyParser.json()); // parse application/json
// parse application/vnd.api+json as json
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({"extended": "true"}));
app.use(methodOverride());

// load the routes
// Pass our express app to routes module and it will be populated
// with corresponding routes functions
require("./app/routes")(app);

// listen port 3000
app.listen(port);
console.log("Server started at port " + port);

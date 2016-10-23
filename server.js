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

// define todo model
var Todo = mongoose.model("Todo", {
  // MongoDB will automatically generate an _id
  text: String
});

// express routes
// get all todos
app.get("/api/todos", function(req, res) {
  // use mongoose model to get all todos from database
  Todo.find(function(err, todos) {
    if (err) res.send(err);
    res.json(todos); // return all todos in JSON format
  });
});
// create single todo
app.post("/api/todos", function(req, res) {
  // create a todo, data comes from AJAX request from Angular
  Todo.create({
    text: req.body.text,
    done: false
  }, function(err, todo) {
    if (err) res.send(err);
    // get and return all todos after you create a new one
    Todo.find(function(err, todos) {
      if (err) res.send(err);
      res.json(todos);
    });
  });
});
// delete single todo
app.delete("/api/todos/:todo_id", function(req, res) {
  // _id which todo delete comes from request params
  Todo.remove({
    _id: req.params.todo_id
  }, function(err, todo) {
    if (err) res.send(err);
    // get all todos after delete
    Todo.find(function(err, todos) {
      if (err) res.send(err);
      res.json(todos);
    });
  });
});
// default route will lead to index.html
app.get("*", function(req, res) {
  // load the single view file
  // Angular will handle the page changes on the front-end
  res.sendFile("./public/index.html");
});

// listen port 3000
app.listen(3000);
console.log("Server started at port 3000");

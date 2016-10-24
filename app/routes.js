// grab the todo model
var Todo = require("./models/todo");

// expose routes to our app
module.exports = function(app) {
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
};

angular.module("todoController", [])
// inject Todos factory in the controller
// here we have access to factory through main app
.controller("mainController", function($scope, $http, Todos) {
  $scope.formData = {};
  // GET
  // when landing on page, load all todos and show them
  // call function from the service
  Todos.get()
    .success(function(data) {
      $scope.todos = data;
    })
    .error(function(data) {
      console.log("Error " + data);
    });
  // POST
  // on submit the add form, send the text to the Node API
  $scope.createTodo = function() {
    // validate the formData to make sure that something is there
    // if form is empty, nothing will happen
    // jQuery is used here
    if (!$.isEmptyObject($scope.formData)) {
      // call the create function from our service (returns a promise object)
      Todos.create($scope.formData)
        .success(function(data) {
          $scope.formData = {}; // clear the form
          $scope.todos = data; // assign our new list of todos
        })
        .error(function(data) {
          console.log("Error " + data);
        });
    }
  };
  // DELETE
  // delete a todo after checking it
  $scope.deleteTodo = function(id) {
    Todos.delete(id)
      .success(function(data) {
        $scope.todos = data;
      })
      .error(function(data) {
        console.log("Error " + data);
      })
  };
});

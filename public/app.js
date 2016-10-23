var todoApp = angular.module("todoApp", []);

function mainController($scope, $http) {
  $scope.formData = {};
  // when landing on page, load all todos and show them
  $http.get("/api/todos")
    .success(function(data) {
      $scope.todos = data;
      console.log(data);
    })
    .error(function(data) {
      console.log("Error " + data);
    });
  // on submit the add form, send the text to the Node API
  $scope.createTodo = function() {
    $http.post("/api/todos", $scope.formData)
      .success(function(data) {
        $scope.formData = {}; // clear the form
        $scope.todos = data;
        console.log(data);
      })
      .error(function(data) {
        console.log("Error " + data);
      })
  };
  // delete a todo after checking it
  $scope.deleteTodo = function(id) {
    $http.delete("/api/todos/" + id)
      .success(function(data) {
        $scope.todos = data;
        console.log(data);
      })
      .error(function(data) {
        console.log("Error " + data);
      });
  };
}

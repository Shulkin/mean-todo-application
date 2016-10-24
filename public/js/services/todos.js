angular.module("todoService", [])
// each function returns a promise object
.factory("Todos", function($http) {
  return {
    get: function() {
      return $http.get("/api/todos");
    },
    create: function(todoData) {
      // pass todoData in POST body
      return $http.post("/api/todos", todoData);
    },
    delete: function(id) {
      // id in DELETE param
      return $http.delete("/api/todos/" + id);
    }
  }
});

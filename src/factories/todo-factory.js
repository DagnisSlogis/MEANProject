import _ from 'lodash';
import angular from 'angular';

const todoFactory = angular.module('app.todoFactory', [])

.factory('todoFactory', ($http) => {
    //  Get Lists in DB
    function getLists($scope) {
        $http.get('/lists').success(response => {
            $scope.lists = response.lists;
        });
    }
    // Get ToDos from DB
    function getTasks($scope) {
        $http.get('/todos').success(response => {
            $scope.todos = response.todos;
        });
    }
    // Creates Task in a list
    function createTask($scope, params, list) {
      if (!list.todo) { return; }
      $http.post('/todos', {
          task: list.todo,
          todoColor: list.color,
          list: list,
          isCompleted: false,
          isEditing: false
      }).success(response => {
          getLists($scope);
          $scope.createTaskInput = '';
      });
      params.createHasInput = false;
      $scope.createTaskInput = '';
    }
    // Updates Tasks name
    function updateTask($scope, todo) {
      $http.put(`/todos/${todo._id}`, {
        task: todo.updatedTask,
        todoColor: todo.updatedColor
      }).success(response => {
          getLists($scope);
          todo.isEditing = false;
      });
    }
    // Deletes Task if it is archived
    function deleteTask($scope, todoToDelete) {
      $http.delete(`/todos/${todoToDelete._id}`).success(response => {
          getLists($scope);
      });
    }
    // Archives Task or unarchives it
    function archiveTask($scope, todo) {
      let reverse = 0;
      if(todo.isCompleted) {
        reverse = 0;
      }
      else {
        reverse = 1;
      }
      $http.put(`/todos/archive/${todo._id}`, {
        isCompleted: reverse
      }).success(response => {
        todo.isCompleted = reverse;
        getLists($scope);
      });
    }
    // Returning available functions
    return {
        getTasks,
        createTask,
        updateTask,
        deleteTask,
        archiveTask
    };
});

// Exporting Factory
export default todoFactory;

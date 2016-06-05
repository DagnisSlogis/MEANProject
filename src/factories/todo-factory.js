import _ from 'lodash';
import angular from 'angular';

const todoFactory = angular.module('app.todoFactory', [])

.factory('todoFactory', ($http) => {
    function getLists($scope) {
        $http.get('/lists').success(response => {
            $scope.lists = response.lists;
        });
    }

    function getTasks($scope) {
        $http.get('/todos').success(response => {
            $scope.todos = response.todos;
        });
    }

    function createTask($scope, params, list) {
      console.log(list);
      if (!list.todo) { return; }
      $http.post('/todos', {
          task: list.todo,
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

    function updateTask($scope, todo) {
        $http.put(`/todos/${todo._id}`, { task: todo.updatedTask }).success(response => {
            getTasks($scope);
            todo.isEditing = false;
        });

        // todo.task = todo.updatedTask;
        // todo.isEditing = false;
    }

    function deleteTask($scope, todoToDelete) {
        $http.delete(`/todos/${todoToDelete._id}`).success(response => {
            getTasks($scope);
        });

        // _.remove($scope.todos, todo => todo.task === todoToDelete.task);
    }

    function watchCreateTaskInput(params, $scope, val) {
        const createHasInput = params.createHasInput;

        if (!val && createHasInput) {
            $scope.todos.pop();
            params.createHasInput = false;
        } else if (val && !createHasInput) {
            $scope.todos.push({ task: val, isCompleted: false });
            params.createHasInput = true;
        } else if (val && createHasInput) {
            $scope.todos[$scope.todos.length - 1].task = val;
        }
    }

    function createList($scope, params) {
      console.log("test");
    }

    return {
        getTasks,
        createTask,
        updateTask,
        deleteTask,
        watchCreateTaskInput
    };
});

export default todoFactory;

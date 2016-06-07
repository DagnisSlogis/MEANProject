import _ from 'lodash';
import angular from 'angular';

const clickEventFactory = angular.module('app.clickEventFactory', [])

.factory('clickEventFactory', ($http) => {

  function onCompletedClick($scope, todo) {
    todo.isCompleted = !todo.isCompleted;
  }

  function onCreateListClick($scope, list) {
    list.isCreatingNew = true;
  }

  function onCloseCreateListClick($scope, list) {
    list.isCreatingNew = false;
  }

  function onEditClick($scope, todo) {
    if(!todo.isCompleted) {
      todo.isEditing = true;
      todo.updatedTask = todo.task;
      todo.updatedColor = todo.todoColor;
    }
  }

  function onEditClick($scope, list) {
    list.isEditing = true;
    list.updatedList = list.name;
    list.updatedColor = list.listColor;
  }

  function onCancelClick($scope, todo) {
    todo.isEditing = false;
  }

  return {
    onCompletedClick,
    onCreateListClick,
    onCloseCreateListClick,
    onEditClick,
    onEditClick,
    onCancelClick
  };
});

export default clickEventFactory;

import _ from 'lodash';
import angular from 'angular';

const clickEventFactory = angular.module('app.clickEventFactory', [])

.factory('clickEventFactory', ($http) => {

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

  function onEditLinkClick($scope, list) {
    list.isEditing = true;
    list.updatedList = list.name;
    list.updatedColor = list.listColor;
  }

  function onCancelClick($scope, todo) {
    todo.isEditing = false;
  }

  return {
    onCreateListClick,
    onCloseCreateListClick,
    onEditClick,
    onEditLinkClick,
    onCancelClick
  };
});

export default clickEventFactory;

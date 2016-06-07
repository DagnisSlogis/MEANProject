import _ from 'lodash';

export default function($scope, todoFactory, listFactory, clickEventFactory ) {

    let params = {
        createHasInput: false
    };

    // Available colors
    // TODO: Save them in DB, create CRUD for managment
    $scope.colors = {
      red: "#ffa7a7",
      green: "#e5ffa7",
      blue: "#a7caff",
      default: "#f8f8f8"
    };

    // Get all the content
    listFactory.getLists($scope);

    $scope.onCompletedClick = todo => {
        todo.isCompleted = !todo.isCompleted;
    };

    $scope.onCreateListClick = list => {
      list.isCreatingNew = true;
    }

    $scope.onCloseCreateListClick = list => {
      list.isCreatingNew = false;
    }

    $scope.onEditClick = todo => {
      if(!todo.isCompleted) {
        todo.isEditing = true;
        todo.updatedTask = todo.task;
        todo.updatedColor = todo.todoColor;
      }
    };

    $scope.onEditLinkClick = list => {
      list.isEditing = true;
      list.updatedList = list.name;
      list.updatedColor = list.listColor;
    }

    $scope.onCancelClick = todo => {
        todo.isEditing = false;
    };

    const { createTask, updateTask, deleteTask, archiveTask } = todoFactory;
    const { createList, updateList, deleteList } = listFactory;
    // const { onCompletedClick, onCreateListClick, onCloseCreateListClick, onEditClick, onEditClick, onCancelClick }

    $scope.createTask = _.partial(createTask, $scope, params);
    $scope.updateTask = _.partial(updateTask, $scope);
    $scope.deleteTask = _.partial(deleteTask, $scope);
    $scope.archiveTask = _.partial(archiveTask, $scope);

    // $scope.onCompletedClick = _.partial(onCompletedClick, $scope);
    // $scope.onCompletedClick = _.partial(onCompletedClick, $scope);

    $scope.createList = _.partial(createList, $scope);
    $scope.updateList = _.partial(updateList, $scope);
    $scope.deleteList = _.partial(deleteList, $scope);

  }

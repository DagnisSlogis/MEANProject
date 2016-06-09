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

    const { createTask, updateTask, deleteTask, archiveTask } = todoFactory;
    const { createList, updateList, deleteList } = listFactory;
    const { onCreateListClick, onCloseCreateListClick, onEditClick, onEditLinkClick, onCancelClick } = clickEventFactory;

    $scope.createTask = _.partial(createTask, $scope, params);
    $scope.updateTask = _.partial(updateTask, $scope);
    $scope.deleteTask = _.partial(deleteTask, $scope);
    $scope.archiveTask = _.partial(archiveTask, $scope);

    $scope.onCreateListClick = _.partial(onCreateListClick, $scope);
    $scope.onCloseCreateListClick = _.partial(onCloseCreateListClick, $scope);
    $scope.onEditClick = _.partial(onEditClick, $scope);
    $scope.onEditLinkClick = _.partial(onEditLinkClick, $scope);
    $scope.onCancelClick = _.partial(onCancelClick, $scope);

    $scope.createList = _.partial(createList, $scope);
    $scope.updateList = _.partial(updateList, $scope);
    $scope.deleteList = _.partial(deleteList, $scope);

  }

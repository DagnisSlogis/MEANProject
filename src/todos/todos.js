import _ from 'lodash';

export default function($scope, todoFactory, listFactory ) {
    let params = {
        createHasInput: false
    };

    listFactory.getLists($scope);
    // todoFactory.getTasks($scope);

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
        todo.isEditing = true;
        todo.updatedTask = todo.task;
    };

    $scope.onEditLinkClick = list => {
      list.isEditing = true;
      list.updatedList = list.name
    }

    $scope.onCancelClick = todo => {
        todo.isEditing = false;
    };

    const { createTask, updateTask, deleteTask, watchCreateTaskInput } = todoFactory;
    const { createList, deleteList } = listFactory;

    $scope.createTask = _.partial(createTask, $scope, params);
    $scope.updateTask = _.partial(updateTask, $scope);
    $scope.deleteTask = _.partial(deleteTask, $scope);
    $scope.createList = _.partial(createList, $scope, params);
    $scope.deleteList = _.partial(deleteList, $scope);

    $scope.$watch('createTaskInput', _.partial(watchCreateTaskInput, params, $scope));
  }

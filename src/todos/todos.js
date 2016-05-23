import _ from 'lodash';

export default function($scope, todoFactory) {
    let params = {
        createHasInput: false
    };

    todoFactory.getTasks($scope);

    $scope.onCompletedClick = todo => {
        todo.isCompleted = !todo.isCompleted;
    };

    $scope.onEditClick = todo => {
        todo.isEditing = true;
        todo.updatedTask = todo.task;
    };

    $scope.onCancelClick = todo => {
        todo.isEditing = false;
    };

    const { createTask, updateTask, deleteTask, watchCreateTaskInput } = todoFactory;

    $scope.createTask = _.partial(createTask, $scope, params);
    $scope.updateTask = _.partial(updateTask, $scope);
    $scope.deleteTask = _.partial(deleteTask, $scope);
    $scope.$watch('createTaskInput', _.partial(watchCreateTaskInput, params, $scope));
}

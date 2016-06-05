import _ from 'lodash';
import angular from 'angular';

const listFactory = angular.module('app.listFactory', [])

.factory('listFactory', ($http) => {

  function getLists($scope) {
      $http.get('/lists').success(response => {
          $scope.lists = response.lists;
      });
  }

  function createList($scope, params) {
    if (!$scope.createList.input) { return; }
    $http.post('/lists', {
        name: $scope.createList.input,
        isArchived: false
    }).success(response => {
        getLists($scope);
        $scope.createList.input = '';
    });

    // params.createHasInput = false;
    // $scope.createTaskInput = '';
  }

  function deleteList($scope, list) {
    $http.delete(`/lists/${list._id}`).success(response => {
        getLists($scope);
    });
  }

  return {
      getLists,
      createList,
      deleteList
  };
});

export default listFactory;

import _ from 'lodash';
import angular from 'angular';

const listFactory = angular.module('app.listFactory', [])

.factory('listFactory', ($http) => {

  function getLists($scope) {
      $http.get('/lists').success(response => {
          $scope.lists = response.lists;
      });
  }

  function createList($scope) {
    if (!$scope.createList.input) { return; }
    $http.post('/lists', {
        name: $scope.createList.input,
        isArchived: false,
        listColor: $scope.createList.color
    }).success(response => {
        getLists($scope);
        $scope.createList.input = '';
        $scope.createList.color = '';
    });
  }

  function updateList($scope, list) {
    $http.put(`/lists/${list._id}`, {
      name: list.updatedList,
      listColor: list.updatedColor
    }).success(response => {
        getLists($scope);
        list.isEditing = false;
    });
  }

  function deleteList($scope, list) {
    $http.delete(`/lists/${list._id}`).success(response => {
        getLists($scope);
    });
  }

  return {
      getLists,
      createList,
      updateList,
      deleteList
  };
});

export default listFactory;

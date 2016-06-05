import _ from 'lodash';
import angular from 'angular';

const userFactory = angular.module('app.userFactory', [])

.factory('userFactory', ($http, $location) => {

  // Creates new User
  function createUser($scope, params) {
    if (!$scope.createUserEmail || !$scope.createUserPassword || !$scope.createUserPasswordSubmit) { console.log("Input all values"); return; }
    if ( $scope.createUserPassword !== $scope.createUserPasswordSubmit) { console.log("Passwords doesnt match"); return; }
    $http.post('/users/register', {
      email: $scope.createUserEmail,
      password: $scope.createUserPassword
    }).success(response => {
      console.log(response);
      $location.path('/users');
    });
  }

  // Login user
  function loginUser($scope) {
    if (!$scope.loginUser.email || !$scope.loginUser.password  ) { console.log("Input all values"); return; }
    console.log($scope.loginUser.email);
    $http.post('/users/login', {
      email: $scope.loginUser.email,
      password: $scope.loginUser.password
    }).success(response => {
      console.log(response);
      $location.path('/');
    });
  }

  return {
    createUser, loginUser
  };
});

export default userFactory;

import _ from 'lodash';
import angular from 'angular';

const userFactory = angular.module('app.userFactory', [])

.factory('userFactory', ($http, $timeout, $q) => {
  var user = null;

  // Check if user is logged in
  function isLoggedIn() {
    if(user) {
      return true;
    } else {
      return false;
    }
  }

  function getUserStatus() {
    return user;
  }

  function login(username, password) {

    // create a new instance of deferred
    var deferred = $q.defer();

    // send a post request to the server
    $http.post('/users/login', {
      email: email,
      password: password
    }).success(function (data, status) {
        if(status === 200 && data.status){
          user = true;
          deferred.resolve();
        } else {
          user = false;
          deferred.reject();
        }
      })
      // handle error
      .error(function (data) {
        user = false;
        deferred.reject();
      });

    // return promise object
    return deferred.promise;
  }

  // Creates new User
  function createUser($scope, params) {
    if (!$scope.createUserEmail || !$scope.createUserPassword || !$scope.createUserPasswordSubmit) { console.log("Input all values"); return; }
    if ( $scope.createUserPassword !== $scope.createUserPasswordSubmit) { console.log("Passwords doesnt match"); return; }
    $http.post('/users/register', {
      email: $scope.createUserEmail,
      password: $scope.createUserPassword
    }).success(response => {
      $scope.createUserEmail = '';
      $scope.createUserPassword = '';
      $scope.createUserPasswordSubmit = '';
    });
  }

  return {
    createUser
  };
});

export default userFactory;

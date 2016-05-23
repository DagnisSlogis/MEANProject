import _ from 'lodash';
import angular from 'angular';

const userFactory = angular.module('app.userFactory', [])

.factory('userFactory', ($http) => {
    function createUser($scope) {
        console.log("Creating");
    }

    return {
        createUser
    };
});

export default userFactory;

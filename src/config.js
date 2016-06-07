import angular from 'angular';
import uiRouter from 'angular-ui-router';
import todoFactory from 'factories/todo-factory'
import listFactory from 'factories/list-factory'
import clickEventFactory from 'factories/click-event-factory'
import todosController from 'todos/todos';

// Init Angular APP
const app = angular.module('app', [uiRouter, todoFactory.name, listFactory.name, clickEventFactory.name]);

app.config(($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) => {
	$httpProvider.interceptors.push(function($q, $location) {
		return {
			response: function(response) {
				return response;
			},
			responseError: function(response) {
				if (response.status === 401)
					$location.url('/');
				return $q.reject(response);
			}
		};
	});
	$urlRouterProvider.otherwise('/');
	$stateProvider
		.state('todos', {
			url: '/',
			template: require('todos/todos.html'),
			controller: todosController
		})
	$locationProvider.html5Mode(true);
});

export default app;

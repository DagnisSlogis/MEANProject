import angular from 'angular';
import uiRouter from 'angular-ui-router';
import todoFactory from 'factories/todo-factory'
import listFactory from 'factories/list-factory'
import todosController from 'todos/todos';

const app = angular.module('app', [uiRouter, todoFactory.name, listFactory.name]);

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
		.state('about', {
			url: '/about',
			template: require('about/about.html')
		})
	$locationProvider.html5Mode(true);
});

export default app;

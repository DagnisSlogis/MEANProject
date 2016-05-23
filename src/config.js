import angular from 'angular';
import uiRouter from 'angular-ui-router';
import todoFactory from 'factories/todo-factory'
import todosController from 'todos/todos';
import usersController from 'users/users';

const app = angular.module('app', [uiRouter, todoFactory.name]);

app.config(($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) => {
	$httpProvider.interceptors.push(function($q, $location) {
		return {
			response: function(response) {
				return response;
			},
			responseError: function(response) {
				if (response.status === 401)
					$location.url('/users');
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
		.state('users_login', {
			url: '/users',
			template: require('users/login.html'),			
			controller: usersController
		})
		.state('users/register', {
			url: '/users/register',
			template: require('users/register.html'),			
			controller: usersController
		})
	$locationProvider.html5Mode(true);
});

export default app;

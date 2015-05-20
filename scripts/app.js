var socialNetwork = socialNetwork || angular.module('socialNetworkApp', ['ngRoute']);

socialNetwork.config(['$routeProvider', '$locationProvider',
	function($routeProvider, $locationProvider) {

		$routeProvider.when('/', {
			templateUrl: 'views/home.html',
			controller: 'UserController'
		}).when('/login', {
			templateUrl: 'views/login.html',
			controller: 'UserController'
		}).when('/register', {
			templateUrl: 'views/register.html',
			controller: 'UserController'
		}).otherwise({
			redirectTo: '/'
		});
	}
]);
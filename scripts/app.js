var socialNetwork = socialNetwork || angular.module('socialNetworkApp', ['ngRoute']);

socialNetwork.config(['$routeProvider', '$locationProvider',
	function($routeProvider, $locationProvider) {
		$locationProvider.html5Mode(true);

		$routeProvider.when('/', {
			templateUrl: 'views/',
			controller: ''
		}).otherwise({
			redirectTo: '/'
		});
	}
]);
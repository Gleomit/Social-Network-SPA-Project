var socialNetwork = socialNetwork || angular.module('socialNetworkApp', ['ngRoute']);

socialNetwork.config(['$routeProvider', '$locationProvider',
	function($routeProvider, $locationProvider) {

		$routeProvider.when('/', {
			templateUrl: 'views/home.html',
		}).when('/profile', {
			templateUrl: 'views/editProfile.html'
		}).when('/profile/password', {
			templateUrl: 'views/changePassword.html',
		}).when('/users/:username/friends', {
			templateUrl: 'views/userFriends.html',
		}).when('/users/:username', {
			templateUrl: 'views/userWall.html',
		}).otherwise({
			redirectTo: '/'
		});
	}
]);
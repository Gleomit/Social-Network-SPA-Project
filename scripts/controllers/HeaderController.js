var socialNetwork = socialNetwork || angular.module('socialNetworkApp', ['ngRoute']);

socialNetwork.controller('HeaderController', function($scope, $location,
	UserService, ProfileService, NotificationService) {
	$scope.Me = (sessionStorage['user'] ? JSON.parse(sessionStorage['user']) : undefined);

	$scope.Logout = function() {
		UserService.logout()
			.then(function(result) {
				$scope.mainCtrl.Logged = false;
				$location.path('/');
			}, function(error) {
				console.log(error);
				$scope.mainCtrl.Logged = false;
				$location.path('/');
			});
	};

	$scope.getFriendRequests = function(event) {
		event.preventDefault();
		ProfileService.getFriendRequests()
			.then(function(result) {
				$scope.friendRequests = result.data;
				console.log(result);
			}, function(error) {
				console.log(error);
			});
	};

	$scope.makeSearch = function() {
		if ($scope.userSearch) {
			UserService.searchUser($scope.userSearch).then(function(result) {
				console.log(result);
			}, function(error) {

			});
		}
	};
});
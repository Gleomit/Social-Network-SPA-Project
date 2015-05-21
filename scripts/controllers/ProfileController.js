var socialNetwork = socialNetwork || angular.module('socialNetworkApp', ['ngRoute']);

socialNetwork.controller('ProfileController', function($scope, ProfileService) {
	$scope.Me = (sessionStorage['user'] ? JSON.parse(sessionStorage['user']) : undefined);
	ProfileService.myInfo()
		.then(function(result) {
			console.log(result)
			$scope.profile = result.data;
			$scope.edit = {
				name: result.data.name,
				email: result.data.email,
				gender: result.data.gender
			};
		}, function(error) {
			console.log(error);
		});

	$scope.friendRequests = function() {

	};

	$scope.changePassword = function() {

	};

	$scope.editProfile = function() {

	};
});
var socialNetwork = socialNetwork || angular.module('socialNetworkApp', ['ngRoute']);

socialNetwork.controller('FriendsController', function($scope, $routeParams, UserService, NotificationService) {
	$scope.theUser = $routeParams.username;
	$scope.userProfile = {};

	UserService.userInfo($routeParams.username)
		.then(function(result){
			$scope.userProfile = result.data;

			if($scope.userProfile.isFriend){
				loadFriends();
			}

			console.log(result)
		}, function(error){
			console.log(error);
		});

	

	function loadFriends (){
		UserService.userFriends($routeParams.username)
			.then(function(result){
				$scope.userFriends = result.data;
			}, function(error){
				console.log(error);
			});
	}
});
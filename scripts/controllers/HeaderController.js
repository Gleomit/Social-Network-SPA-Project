var socialNetwork = socialNetwork || angular.module('socialNetworkApp', ['ngRoute']);

socialNetwork.controller('HeaderController', function($scope, $location,
	UserService, ProfileService, NotificationService) {
	$scope.Me = (sessionStorage['user'] ? JSON.parse(sessionStorage['user']) : undefined);
	$scope.searchResults = [];

	$scope.Logout = function() {
		UserService.logout()
			.then(function(result) {
				$scope.mainCtrl.Logged = false;
				$location.path('/');
				NotificationService.success("Successfully logged out.");
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

	$scope.rejectFriendRequest = function(event){
		event.preventDefault();
		var respondData = {
			requestId: $(event.target).parents('.friendRequest').last().attr('data-id'),
			status: 'rejected'
		}

		ProfileService.respondToRequest(respondData)
			.then(function(result){
				console.log(result);
			}, function(error){
				console.log(error);
				//NotificationService.error('Error during rejecting friend request.');
			});
	};

	$scope.approveFriendRequest = function(event){
		event.preventDefault();
		var respondData = {
			requestId: $(event.target).parents('.friendRequest').last().attr('data-id'),
			status: 'approved'
		}

		ProfileService.respondToRequest(respondData)
			.then(function(result){
				console.log(result);
			}, function(error){
				console.log(error);
				//NotificationService.error('Error during approving friend request.');
			});
	};

	$scope.makeSearch = function() {
		if ($scope.userSearch) {
			UserService.searchUser($scope.userSearch)
				.then(function(result) {
					$scope.searchResults = result.data;
				}, function(error) {

				});
		}
	};
});
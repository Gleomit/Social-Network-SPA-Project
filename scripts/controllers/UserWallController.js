var socialNetwork = socialNetwork || angular.module('socialNetworkApp', ['ngRoute']);

socialNetwork.controller('UserWallController', function($scope, $routeParams, $location,
	UserService, ProfileService, NotificationService) {
	$scope.startPostId = 0;
	$scope.pageSize = 3;
	$scope.userProfile = {};
	loadUserProfile();

	$scope.sendFriendRequest = function(event) {
		event.preventDefault();
		var data = {username: $scope.userProfile.username};

		ProfileService.makeFriendRequest(data)
			.then(function(result){
				console.log(result);
			}, function(error){

			});
	};

	function loadUserProfile() {
		var userData = {
			startPostId: $scope.startPostId,
			pageSize: $scope.pageSize,
			username: $routeParams.username
		};

		UserService.userInfo(userData.username)
			.then(function(result) {
				console.log(result)
				$scope.userProfile = result.data;

				if ($scope.userProfile.isFriend) {
					UserService.userFriendsPreview($scope.userProfile.username)
						.then(function(friendsResult) {
							$scope.userProfile.friendsTotal = friendsResult.totalCount;
							$scope.userProfile.friends = friendsResult.friends;
						}, function(result) {

						});
				}

			}, function(error) {
				console.log(error);
			});

		UserService.userWall(userData)
			.then(function(result) {
				console.log(result)
				$scope.userProfile.posts = result.data;
			}, function(error) {
				console.log(error);
			});
	}

	$scope.likeComment = function(event){

	};

	$scope.likePost = function(event){

	};

	$scope.unlikeComment = function(event){

	};

	$scope.unlikePost = function(event){

	};
});
var socialNetwork = socialNetwork || angular.module('socialNetworkApp', ['ngRoute']);

socialNetwork.controller('UserWallController', function($scope, $routeParams, $location,
	UserService, ProfileService, NotificationService, PostService, CommentService) {
	$scope.startPostId = 0;
	$scope.pageSize = 5;
	$scope.userProfile = {};

	loadUserProfile();

	$scope.sendFriendRequest = function(event) {
		event.preventDefault();
		var data = {
			username: $scope.userProfile.username
		};

		ProfileService.makeFriendRequest(data)
			.then(function(result) {
				$scope.userProfile.hasPendingRequest = true;
				NotificationService.success('Successfully sended friend request.');
			}, function(error) {
				//NotificationService.error('Error during sending friend request.');
			});
	};

	function loadUserProfile() {
		var userData = {
			startPostId: $scope.startPostId,
			pageSize: $scope.pageSize,
			username: $routeParams.username
		};

		$scope.myProfile = JSON.parse(sessionStorage['user']);

		UserService.userInfo(userData.username)
			.then(function(result) {
				$scope.userProfile = result.data;

				if (result.data.isFriend == true) {
					loadFriendsPreview();
				}

			}, function(error) {
				console.log(error);
				// NotificationService.success('Failed loading user information.');
			});

		loadUserWall();
	}

	function loadFriendsPreview() {
		UserService.userFriendsPreview($scope.userProfile.username)
			.then(function(result) {
				console.log(result)
				$scope.userProfile.friendsTotal = result.data.totalCount;
				$scope.userProfile.friends = result.data.friends;
			}, function(error) {
				console.log(error);
				//NotificationService.success('Failed loading friends preview.');
			});
	}

	function loadUserWall() {
		var userData = {
			startPostId: $scope.startPostId,
			pageSize: $scope.pageSize,
			username: $routeParams.username
		};

		UserService.userWall(userData)
			.then(function(result) {
				console.log(result)
				$scope.userProfile.posts = result.data;
			}, function(error) {
				console.log(error);
				//NotificationService.success('Failed loading user wall information.');
			});
	}

	$scope.likePost = function(event) {

	};

	$scope.unlikePost = function(event) {

	};

	$scope.editPost = function(event) {

	};

	$scope.makePostt = function(message) {
		var data = {
			postContent: message,
			username: $scope.userProfile.username
		};

		PostService.createPost(data)
			.then(function(result){
				console.log(result);
			}, function(error){
				console.log(error);
			});
	};

	$scope.deletePost = function(event) {

	};
});
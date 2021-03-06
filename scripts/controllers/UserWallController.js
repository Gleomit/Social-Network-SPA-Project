var socialNetwork = socialNetwork || angular.module('socialNetworkApp', ['ngRoute']);

socialNetwork.controller('UserWallController', function($scope, $routeParams, $location,
	UserService, ProfileService, NotificationService, PostService) {
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
				$scope.userProfile.friendsTotal = result.data.totalCount;
				$scope.userProfile.friends = result.data.friends;
			}, function(error) {
				console.log(error);
				//NotificationService.success('Failed loading friends preview.');
			});
	}

	function loadUserWall() {
		var userData = {
			startPostId: '',
			pageSize: $scope.pageSize,
			username: $routeParams.username
		};

		UserService.userWall(userData)
			.then(function(result) {
				console.log(result)
				$scope.newsFeed = result.data;
			}, function(error) {
				console.log(error);
				//NotificationService.success('Failed loading user wall information.');
			});
	}

	$scope.makePost = function(message) {
		var data = {
			postContent: message,
			username: $scope.userProfile.username
		};

		PostService.createPost(data)
			.then(function(result){
				$('textarea').val("");
				$scope.newsFeed.unshift(result.data);
				NotificationService.successNoty('Successfully added post');
				console.log(result);
			}, function(error){
				NotificationService.errorNoty('Error during adding post');
				console.log(error);
			});
	};

	$scope.loadMoreNews = function() {
		var userData = {
			startPostId: $scope.newsFeed[$scope.newsFeed.length - 1].id,
			pageSize: $scope.pageSize,
			username: $routeParams.username
		};

		UserService.userWall(userData)
			.then(function(result) {
				NotificationService.successNoty('Successfully loaded more 5 posts');
				console.log(result)
				for(var i = 0; i < result.data.length; i += 1) {
					$scope.newsFeed.push(result.data[i]);
				}
				
			}, function(error) {
				NotificationService.errorNoty('Error during loading more posts');
				console.log(error);
				//NotificationService.success('Failed loading user wall information.');
			});
	};
});
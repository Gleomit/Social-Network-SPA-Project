var socialNetwork = socialNetwork || angular.module('socialNetworkApp', ['ngRoute']);

socialNetwork.controller('NewsFeedController', function($scope, ProfileService,
	NotificationService, PostService, CommentService) {
	$scope.startPostId = 0;
	$scope.pageSize = 5;

	loadNewsFeed();
	loadFriendsPreview();

	function loadNewsFeed() {
		$scope.myProfile = JSON.parse(sessionStorage['user']);
		var newsData = {
			startPostId: $scope.startPostId,
			pageSize: $scope.pageSize
		};

		ProfileService.getFeedNews(newsData)
			.then(function(result) {
				console.log(result)
				$scope.news = result.data;
			}, function(error) {
				console.log(error);
			});
	}

	function loadFriendsPreview() {
		ProfileService.getFriendsPreview().then(function(result) {
			console.log(result.data.friends)
			$scope.friends = result.data.friends;
			$scope.totalCount = result.data.totalCount;
		}, function(error) {
			console.log(error);
		});
	}

	$scope.previewUser = function(event) {

	};

	$scope.likeComment = function(event) {

	};

	$scope.makeComment = function(event) {

	};

	$scope.unlikeComment = function(event) {

	};

	$scope.editComment = function(event) {

	};

	$scope.deleteComment = function(event) {

	};

	$scope.likePost = function(event) {

	};

	$scope.unlikePost = function(event) {

	};

	$scope.editPost = function(event) {

	};

	$scope.makePost = function(message) {
		var data = {
			postContent: message,
			username: JSON.parse(sessionStorage['user']).username
		};

		PostService.createPost(data)
			.then(function(result) {
				console.log(result);
			}, function(error) {
				console.log(error);
			});
	};

	$scope.deletePost = function(event, postId) {
		event.preventDefault();
		PostService.deletePost(postId)
			.then(function(result){

			}, function(error){

			});
	};
});
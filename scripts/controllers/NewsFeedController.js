var socialNetwork = socialNetwork || angular.module('socialNetworkApp', ['ngRoute']);

socialNetwork.controller('NewsFeedController', function($scope, ProfileService, NotificationService) {
	$scope.startPostId = 0;
	$scope.pageSize = 3;

	loadNewsFeed();
	loadFriendsPreview();

	function loadNewsFeed() {
		var newsData = {
			startPostId: $scope.startPostId,
			pageSize: $scope.pageSize
		};

		ProfileService.getFeedNews(newsData).then(function(result) {
			$scope.news = result.data;
		}, function(error) {
			console.log(error);
		});
	}

	function loadFriendsPreview() {
		ProfileService.getMyFriendsPreview().then(function(result) {
			$scope.friends = result.data.friends;
			$scope.totalCount = result.data.totalCount;
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
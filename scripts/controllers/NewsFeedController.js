var socialNetwork = socialNetwork || angular.module('socialNetworkApp', ['ngRoute']);

socialNetwork.controller('NewsFeedController', function($scope, ProfileService,
	NotificationService, PostService, CommentService) {
	$scope.startPostId = 0;
	$scope.pageSize = 10;

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
			$scope.myProfile.friends = result.data.friends;
			$scope.myProfile.totalCount = result.data.totalCount;
		}, function(error) {
			console.log(error);
		});
	}
});
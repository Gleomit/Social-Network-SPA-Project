var socialNetwork = socialNetwork || angular.module('socialNetworkApp', ['ngRoute']);

socialNetwork.controller('NewsFeedController', function($scope, ProfileService,
	NotificationService, PostService) {
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
				$scope.newsFeed = result.data;
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

	$scope.makePost = function(message) {
		var data = {
			postContent: message,
			username: $scope.myProfile.username
		};

		PostService.createPost(data)
			.then(function(result){
				message = "";
				$scope.newsFeed.unshift(result.data);
				console.log(result);
			}, function(error){
				console.log(error);
			});
	};
});
var socialNetwork = socialNetwork || angular.module('socialNetworkApp', ['ngRoute']);

socialNetwork.controller('NewsFeedController', function($scope, ProfileService,
	NotificationService, PostService) {
	$scope.startPostId = 0;
	$scope.pageSize = 5;

	loadNewsFeed();
	loadFriendsPreview();

	function loadNewsFeed() {
		$scope.myProfile = JSON.parse(sessionStorage['user']);
		var newsData = {
			startPostId: '',
			pageSize: $scope.pageSize
		};
		console.log($scope.myProfile)
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

	$scope.loadMoreNews = function() {
		var newsData = {
			startPostId: $scope.newsFeed[$scope.newsFeed.length - 1].id,
			pageSize: $scope.pageSize
		};

		ProfileService.getFeedNews(newsData)
			.then(function(result) {
				console.log(result)
				for(var i = 0; i < result.data.length; i += 1) {
					$scope.newsFeed.push(result.data[i]);
				}
			}, function(error) {
				console.log(error);
			});
	};
});
var socialNetwork = socialNetwork || angular.module('socialNetworkApp', ['ngRoute']);

socialNetwork.controller('NewsFeedController', function($scope, ProfileService) {
	$scope.startPostId = 0;
	$scope.pageSize = 0;

	ProfileService.getFeedNews({startPostId: $scope.startPostId, pageSize: $scope.pageSize}).then(function(result){
		
	}, function(error){

	});
});
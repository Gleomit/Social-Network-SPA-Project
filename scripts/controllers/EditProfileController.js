var socialNetwork = socialNetwork || angular.module('socialNetworkApp', ['ngRoute']);

socialNetwork.controller('EditProfileController', function($scope, ProfileService) {
	ProfileService.myInfo()
		.then(function(result) {
			console.log(result)
			$scope.profile = result.data;
			$scope.edit = {
				name: result.data.name,
				email: result.data.email,
				gender: result.data.gender
			};
		}, function(error) {
			console.log(error);
		});

	$scope.editProfile = function() {
		
	};
});
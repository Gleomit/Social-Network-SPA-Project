var socialNetwork = socialNetwork || angular.module('socialNetworkApp', ['ngRoute']);

socialNetwork.controller('EditProfileController', function($scope, ProfileService, NotificationService) {
	loadMyProfile();
	
	$scope.editProfile = function() {
		var dataToSave = {
			coverImageData: $scope.edit.coverImageData,
			profileImageData: $scope.edit.profileImageData,
			name: $scope.edit.name,
			email: $scope.edit.email,
			gender: $scope.edit.gender
		};

		ProfileService.editProfile(dataToSave)
			.then(function(result) {
				console.log(result);
				NotificationService.successNoty('Successfully edited profile');
			}, function(error) {
				console.log(error);
				NotificationService.errorNoty('Error during editing profile');
			});
	};

	function loadMyProfile() {
		ProfileService.getProfile()
			.then(function(result) {
				$scope.profile = result.data;
				$scope.edit = result.data;
			}, function(error) {
				console.log(error);
			});
	}
});
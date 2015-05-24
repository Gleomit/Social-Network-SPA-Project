var socialNetwork = socialNetwork || angular.module('socialNetworkApp', ['ngRoute']);

socialNetwork.controller('EditProfileController', function($scope, ProfileService, NotificationService) {
	loadMyProfile();
	attachUploadHandler();

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

	function attachUploadHandler() {
		$('#profilePictureButton').on('click', function(event) {
			event.preventDefault();
			$('#profilePictureInput').click();
		});

		$('#coverPictureButton').on('click', function(event) {
			event.preventDefault();
			$('#coverPictureInput').click();
		});

		$('#coverPictureInput').on('change', function() {
			var file = this.files[0],
				reader;

			if (file.type.match(/image\/.*/)) {
				reader = new FileReader();
				reader.onload = function() {
					$('#coverPicture').attr('src', reader.result);
					$scope.edit.coverImageData = reader.result;
				};
				reader.readAsDataURL(file);
			} else {
				// TODO: Display type-mismatch error message
			}
		});

		$('#profilePictureInput').on('change', function() {
			var file = this.files[0],
				reader;

			if (file.type.match(/image\/.*/)) {
				reader = new FileReader();
				reader.onload = function() {
					$('#profilePicture').attr('src', reader.result);
					$scope.edit.profileImageData = reader.result;
				};
				reader.readAsDataURL(file);
			} else {
				// TODO: Display type-mismatch error message
			}
		});
	}
});
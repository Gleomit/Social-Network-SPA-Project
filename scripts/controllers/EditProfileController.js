var socialNetwork = socialNetwork || angular.module('socialNetworkApp', ['ngRoute']);

socialNetwork.controller('EditProfileController', function($scope, ProfileService, NotificationService) {
	ProfileService.myInfo()
		.then(function(result) {
			$scope.profile = result.data;
			$scope.edit = result.data;
		}, function(error) {
			console.log(error);
		});

	attachUploadHandler();

	$scope.editProfile = function() {

	};

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
				};
				reader.readAsDataURL(file);
			} else {
				// TODO: Display type-mismatch error message
			}
		});
	}
});
var socialNetwork = socialNetwork || angular.module('socialNetworkApp', ['ngRoute']);

socialNetwork.controller('ChangePasswordController', function($scope, ProfileService, NotificationService) {
	$scope.changeThePassword = function(event) {
		var data = {
			oldPassword: $scope.changePassword.password,
			newPassword: $scope.changePassword.newPassword,
			confirmPassword: $scope.changePassword.confirmNewPassword
		};

		ProfileService.changePassword(data)
			.then(function(result){
				console.log(result);
			}, function(error){
				console.log(error);
			});
	};
});
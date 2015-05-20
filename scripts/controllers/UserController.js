var socialNetwork = socialNetwork || angular.module('socialNetworkApp', ['ngRoute']);

socialNetwork.controller('UserController', function($scope, UserService, NotificationService) {
	$scope.register = {};
	$scope.login = {};

	$scope.Login = function(){

	};

	$scope.Register = function(){
		var registerData = {
			username: $scope.register.username,
			password: $scope.register.password,
			confirmPassword: $scope.register.confirmPassword,
			name: $scope.register.name,
			email: $scope.register.email,
			gender: $scope.register.gender
		};

		UserService.register(registerData).then(
		function(result){
			console.log(result);

		}, 
		function(error){
			console.log(error);
		});
	};
});
var socialNetwork = socialNetwork || angular.module('socialNetworkApp', ['ngRoute']);
socialNetwork.controller('UserController', function($scope, UserService, NotificationService) {
	$scope.register = {};
	$scope.login = {};

	$scope.Login = function() {
		var loginData = {
			username: $scope.login.username,
			password: $scope.login.password
		};

		UserService.login(loginData)
			.then(function(result) {
				$scope.mainCtrl.Logged = true;
				resetLogin();
			}, function(error) {
				console.log(error);
				resetLogin();
			});
	};

	$scope.Register = function() {
		var registerData = {
			username: $scope.register.username,
			password: $scope.register.password,
			confirmPassword: $scope.register.confirmPassword,
			name: $scope.register.name,
			email: $scope.register.email,
			gender: $scope.register.gender
		};

		UserService.register(registerData)
			.then(function(result) {
				$scope.mainCtrl.Logged = true;
				resetRegister();
			}, function(error) {
				console.log(error);
				resetRegister();
			});
	};

	function resetRegister() {
		$scope.register.username = '';
		$scope.register.password = '';
		$scope.register.confirmPassword = '';
		$scope.register.name = '';
		$scope.register.email = '';
		$scope.register.gender = '';
	}

	function resetLogin() {
		$scope.login.username = '';
		$scope.login.password = '';
		$scope.login.rememberMe = '';
	}
});
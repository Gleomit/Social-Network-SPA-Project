var socialNetwork = socialNetwork || angular.module('socialNetworkApp', ['ngRoute']);
socialNetwork.controller('UserController', function($scope, $location, UserService, NotificationService) {
	$scope.register = {};
	$scope.login = {};
	$scope.Logged = (localStorage['user'] || sessionStorage['user'] ? true : false);

	$scope.Login = function() {
		var loginData = {
			username: $scope.login.username,
			password: $scope.login.password
		};

		UserService.login(loginData)
			.then(function(result) {
				//console.log(result);
				$scope.Logged = true;
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
				$scope.Logged = true;
				resetRegister();
			}, function(error) {
				console.log(error);
				resetRegister();
			});
	};

	$scope.Logout = function() {
		UserService.logout()
			.then(function(result) {
				console.log(result);
				$location.path('/');
				$scope.Logged = false;
			}, function(error) {
				console.log(error);
				$location.path('/');
				$scope.Logged = false;
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
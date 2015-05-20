var socialNetwork = socialNetwork || angular.module('socialNetworkApp', ['ngRoute']);
socialNetwork.controller('UserController', function($scope, UserService, NotificationService) {
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
				var credentialsData = {
					username: loginData.username,
					access_token: result.data.access_token,
					rememberMe: $scope.login.rememberMe
				};

				setCredentials(credentialsData);
				console.log(result);
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
			.then(function(resultRegister) {
				var loginData = {
					username: resultRegister.data.username,
					password: registerData.password
				};

				UserService.login(loginData)
					.then(function(resultLogin) {
						var credentialsData = {
							username: resultLogin.data.username,
							access_token: resultLogin.data.access_token,
							rememberMe: false
						};

						setCredentials(credentialsData);
						resetRegister();
					}, function(error) {
						console.log(error);
						resetRegister();
					});
			}, function(error) {
				console.log(error);
				resetRegister();
			});
	};

	$scope.Logout = function() {
		UserService.logout()
			.then(function(result) {
				console.log(result);
				removeCredentials();
			}, function(error) {
				console.log(error);
				removeCredentials();
			});
	};

	function setCredentials(credentialsData) {
		if (credentialsData.rememberMe === true) {
			localStorage['user'] = JSON.stringify(credentialsData);
		} else {
			sessionStorage['user'] = JSON.stringify(credentialsData);
		}

		$scope.Logged = true;
	}

	function removeCredentials() {
		if (localStorage['user']) {
			localStorage.removeItem('user');
		} else {
			sessionStorage.removeItem('user');
		}

		$scope.Logged = false;
	}

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
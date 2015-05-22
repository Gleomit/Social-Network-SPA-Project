var socialNetwork = socialNetwork || angular.module('socialNetworkApp', ['ngRoute']);

socialNetwork.factory('UserService', function(baseUrl, getConfig, $q, $http) {
	var serviceUrl = baseUrl + 'users/';

	function login(loginData) {
		var deferred = $q.defer();
		var data = {};

		$http.post(serviceUrl + 'Login', loginData)
			.success(function(result) {
				console.log(result)
				data.username = result.userName;
				data.access_token = result.access_token;

				setCredentials(data);

				userInfo(data.username)
					.success(function(userResult) {
						data.name = userResult.name;
						data.email = userResult.email;
						data.profileImage = userResult.profileImageData;
						data.coverImage = userResult.coverImageData;
						setCredentials(data);
						deferred.resolve(data);
					}).error(function(error) {
						deferred.reject(error);
					});
			}).error(function(error) {
				deferred.reject(error);
			});

		return deferred.promise;
	}

	function logout() {
		var deferred = $q.defer();

		$http.post(serviceUrl + 'Logout', null, getConfig())
			.success(function(result) {
				removeCredentials();
				deferred.resolve(result);
			}).error(function(error) {
				console.log(error);
				removeCredentials();
				deferred.reject(error);
			});

		return deferred.promise;
	}

	function register(registerData) {
		var deferred = $q.defer();

		$http.post(serviceUrl + 'Register', registerData)
			.success(function(result) {
				var loginData = {
					username: registerData.username,
					password: registerData.password
				};

				login(loginData)
					.then(function(loginResult) {
						deferred.resolve(loginResult);
					}, function(error) {
						deferred.reject(error);
					});
			}).error(function(error) {
				deferred.reject(error);
			});

		return deferred.promise;
	}

	function previewUser(username) {
		return $http.get(serviceUrl + username + '/preview', getConfig());
	}

	function searchUser(data) {
		return $http.get(serviceUrl + 'search?searchTerm=' + data, getConfig());
	}

	function userInfo(username) {
		return $http.get(serviceUrl + username, getConfig(), getConfig());
	}

	function userWall(data) {
		return $http.get(serviceUrl + username + '/wall?StartPostId=' + data.startPostId +
		 '&PageSize=' + data.pageSize, getConfig());
	}

	function userFriends(username) {
		return $http.get(serviceUrl + username + '/friends', getConfig());
	}

	function userFriendsPreview(username) {
		return $http.get(serviceUrl + username + '/friends/preview', getConfig());
	}

	function setCredentials(credentialsData) {
		// if (credentialsData.rememberMe === true) {
		// 	localStorage['user'] = JSON.stringify(credentialsData);
		// } else {
		sessionStorage['user'] = JSON.stringify(credentialsData);
		// }
	}

	function removeCredentials() {
		// if (localStorage['user']) {
		// 	localStorage.removeItem('user');
		// } else {
		sessionStorage.removeItem('user');
		// }
	}

	return {
		login: login,
		register: register,
		logout: logout,
		userInfo: userInfo,
		userWall: userWall,
		userFriendsPreview: userFriendsPreview,
		userFriends: userFriends,
		searchUser: searchUser
	};
});
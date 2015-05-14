var socialNetwork = socialNetwork || angular.module('socialNetworkApp', ['ngRoute']);

socialNetwork.factory('UserService', [function(baseUrl, $q, $http) {
	var serviceUrl = baseUrl + 'users/';

	var config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	function login(username, password) {
		var data = {
			username: username,
			password: password
		};

		return $http.post(serviceUrl + 'Login', data, config);
	}

	function logout() {

		return $http.post(serviceUrl + 'Register', null, config);
	}

	function register(registerData) {
		return $http.post(serviceUrl + 'Register', registerData, config);
	}

	function previewUser(username) {
		return $http.get(serviceUrl + username + '/preview', config);
	}

	function searchUser(data) {
		return $http.get(serviceUrl + 'search?searchTerm=' + data, config);
	}

	function userInfo(username) {
		return $http.get(serviceUrl + username, config);
	}

	function userWall(data) {
		return $http.get(serviceUrl + username + '/wall?StartPostId=' + data.startPostId
		 + '&PageSize=' + data.pageSize, config);
	}

	function userFriends(username) {
		return $http.get(serviceUrl + username + '/friends', config);
	}

	function userFriendsPreview(username) {
		return $http.get(serviceUrl + username + '/friends/preview', config);
	}


	return {
		login: login,
		register: register,
		logout: logout
	};
}])
var socialNetwork = socialNetwork || angular.module('socialNetworkApp', ['ngRoute']);

socialNetwork.factory('UserService', function(baseUrl, $q, $http) {
	var serviceUrl = baseUrl + 'users/';

	function login(username, password) {
		var data = {
			username: username,
			password: password
		};

		return $http.post(serviceUrl + 'Login', data);
	}

	function logout() {
		return $http.post(serviceUrl + 'Register', null);
	}

	function register(registerData) {
		return $http.post(serviceUrl + 'Register', registerData);
	}

	function previewUser(username) {
		return $http.get(serviceUrl + username + '/preview');
	}

	function searchUser(data) {
		return $http.get(serviceUrl + 'search?searchTerm=' + data);
	}

	function userInfo(username) {
		return $http.get(serviceUrl + username);
	}

	function userWall(data) {
		return $http.get(serviceUrl + username + '/wall?StartPostId=' + data.startPostId + '&PageSize=' + data.pageSize);
	}

	function userFriends(username) {
		return $http.get(serviceUrl + username + '/friends');
	}

	function userFriendsPreview(username) {
		return $http.get(serviceUrl + username + '/friends/preview');
	}


	return {
		login: login,
		register: register,
		logout: logout
	};
});
var socialNetwork = socialNetwork || angular.module('socialNetworkApp', ['ngRoute']);

socialNetwork.constant('baseUrl', 'http://softuni-social-network.azurewebsites.net/api/');
socialNetwork.constant('profileImageSizeLimit', 128);
socialNetwork.constant('coverImageSizeLimit', 1024);

socialNetwork.constant('getConfig', function() {
	var config = {
		headers: {}
	};

	var userLocalStorage = (localStorage['user'] ? JSON.parse(localStorage['user']) : undefined);
	var userSessionStorage = (sessionStorage['user'] ? JSON.parse(sessionStorage['user']) : undefined);

	if (userLocalStorage && userLocalStorage.rememberMe == true && userLocalStorage.access_token) {
		config.headers.Authorization = 'Bearer ' + userLocalStorage.access_token;
	} else if (userSessionStorage && userSessionStorage.access_token) {
		config.headers.Authorization = 'Bearer ' + userSessionStorage.access_token;
	}

	return config;
});

socialNetwork.run(function($http) {
	$http.defaults.headers.common['Content-Type'] = 'application/json';
});

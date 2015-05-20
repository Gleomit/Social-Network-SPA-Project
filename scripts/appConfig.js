var socialNetwork = socialNetwork || angular.module('socialNetworkApp', ['ngRoute']);

socialNetwork.constant('baseUrl', 'http://softuni-social-network.azurewebsites.net/api/');
socialNetwork.constant('profileImageSizeLimit', 128);
socialNetwork.constant('coverImageSizeLimit', 1024);

socialNetwork.constant('getHeaders', function() {
	var headers = {};

	if (localStorage['rememberMe'] && localStorage['rememberMe'] == true && localStorage['sessionToken']) {
		headers.Authorization = 'Bearer ' + localStorage['sessionToken'];
	} else if (sessionStorage['sessionToken']) {
		headers.Authorization = 'Bearer ' + sessionStorage['sessionToken'];
	}

	return headers;
});

socialNetwork.run(function($http) {
	$http.defaults.headers.common['Content-Type'] = 'application/json';
});

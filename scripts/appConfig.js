var socialNetwork = socialNetwork || angular.module('socialNetworkApp', ['ngRoute']);

socialNetwork.constant('baseUrl', 'http://softuni-social-network.azurewebsites.net/api/');

socialNetwork.run(function($http) {
	$http.defaults.headers.common['Content-Type'] = 'application/json';
});
var socialNetwork = socialNetwork || angular.module('socialNetworkApp', ['ngRoute']);

socialNetwork.controller('HeaderController', function(UserService) {
	$scope.Logged = (sessionStorage['sessionToken'] ? true : false);
});
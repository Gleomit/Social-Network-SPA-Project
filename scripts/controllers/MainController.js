var socialNetwork = socialNetwork || angular.module('socialNetworkApp', ['ngRoute']);

socialNetwork.controller('MainController', function($scope) {
	this.Logged = (sessionStorage['user'] ? true : false);
});
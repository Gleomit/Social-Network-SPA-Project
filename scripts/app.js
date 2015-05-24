var socialNetwork = socialNetwork || angular.module('socialNetworkApp', ['ngRoute']);

socialNetwork.config(['$routeProvider', '$locationProvider',
	function($routeProvider, $locationProvider) {
		
		$routeProvider.when('/', {
			templateUrl: 'views/home.html',
		}).when('/profile', {
			templateUrl: 'views/editProfile.html'
		}).when('/profile/password', {
			templateUrl: 'views/changePassword.html',
		}).when('/users/:username/friends', {
			templateUrl: 'views/userFriends.html',
		}).when('/users/:username', {
			templateUrl: 'views/userWall.html',
		}).otherwise({
			redirectTo: '/'
		});
	}
]);

socialNetwork.run( function($rootScope, $location) {

    var user = (sessionStorage['user'] ? JSON.parse(sessionStorage['user']) : null);
    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
      if (user == null ) {
        if ( next.templateUrl == "views/home.html" ) {
          // already going to #login, no redirect needed
        } else {
          // not going to #login, we should redirect now
          $location.path( "/" );
        }
      }         
    });
 })
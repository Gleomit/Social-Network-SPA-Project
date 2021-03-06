var socialNetwork = socialNetwork || angular.module('socialNetworkApp', ['ngRoute']);

socialNetwork.factory('NotificationService', function() {

	function notify(typeNoty, layout, text, timeout){
		var notification = noty({
			text: text,
			layout: layout,
			type: typeNoty,
			timeout: timeout,
			closeWith: ['click']
		});
	}

	function successNoty (text){
		notify('success', 'topRight', text, 2000);	
	}
	
	function errorNoty (text) {
		notify('error', 'topLeft', text, 4000);	
	}

	return {
		errorNoty: errorNoty,
		successNoty: successNoty
	};
});
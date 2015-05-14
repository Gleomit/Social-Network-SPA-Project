var socialNetwork = socialNetwork || angular.module('socialNetworkApp', ['ngRoute']);

socialNetwork.factory('ProfileService', [function(baseUrl, $q, $http) {
	var serviceUrl = baseUrl + "me/";

	var config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	function myInfo() {
		return $http.get(serviceUrl, config);
	}

	function changeMyInfo(userData) {
		return $http.put(serviceUrl, userData, config);
	}

	function changePassword(passwordData) {
		return $http.put(serviceUrl + 'ChangePassword', passwordData, config);
	}

	function getMyFriends() {
		return $http.get(serviceUrl + 'friends', config);
	}

	function getFeedNews(newsData) {
		return $http.get(serviceUrl + 'feed?StartPostId=' + newsData.startPostId 
			+ '&PageSize=' + newsData.pageSize, config);
	}

	function getFriendRequests(respondData) {
		return $http.get(serviceUrl + 'requests', config);
	}

	function respondToRequest(respondData) {
		return $http.put(serviceUrl + 'requests/' + respondData.requestId
		 + '?status=' + respondData.status, config);
	}

	function makeFriendRequest(requestData) {
		return $http.post(serviceUrl + 'requests/' + requestData.username, null, config);
	}

	return {

	};
}])
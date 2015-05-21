var socialNetwork = socialNetwork || angular.module('socialNetworkApp', ['ngRoute']);

socialNetwork.factory('ProfileService', function(baseUrl, getConfig, $q, $http) {
	var serviceUrl = baseUrl + "me/";

	function myInfo() {
		return $http.get(serviceUrl, getConfig());
	}

	function changeMyInfo(userData) {
		return $http.put(serviceUrl, userData);
	}

	function changePassword(passwordData) {
		return $http.put(serviceUrl + 'ChangePassword', passwordData);
	}

	function getMyFriends() {
		return $http.get(serviceUrl + 'friends');
	}

	function getFeedNews(newsData) {
		return $http.get(serviceUrl + 'feed?StartPostId=' + newsData.startPostId 
			+ '&PageSize=' + newsData.pageSize);
	}

	function getFriendRequests(respondData) {
		return $http.get(serviceUrl + 'requests');
	}

	function respondToRequest(respondData) {
		return $http.put(serviceUrl + 'requests/' + respondData.requestId
		 + '?status=' + respondData.status);
	}

	function makeFriendRequest(requestData) {
		return $http.post(serviceUrl + 'requests/' + requestData.username, null);
	}

	return {
		myInfo: myInfo
	};
});
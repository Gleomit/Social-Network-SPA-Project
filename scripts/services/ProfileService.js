var socialNetwork = socialNetwork || angular.module('socialNetworkApp', ['ngRoute']);

socialNetwork.factory('ProfileService', function(baseUrl, getConfig, $q, $http) {
	var serviceUrl = baseUrl + "me/";

	function myInfo() {
		return $http.get(serviceUrl, getConfig());
	}

	function changeMyInfo(userData) {
		return $http.put(serviceUrl, userData, getConfig());
	}

	function changePassword(passwordData) {
		return $http.put(serviceUrl + 'ChangePassword', passwordData, getConfig());
	}

	function getMyFriends() {
		return $http.get(serviceUrl + 'friends', getConfig());
	}

	function getFeedNews(newsData) {
		return $http.get(serviceUrl + 'feed?StartPostId=' + newsData.startPostId 
			+ '&PageSize=' + newsData.pageSize, getConfig());
	}

	function getFriendRequests(respondData) {
		return $http.get(serviceUrl + 'requests', getConfig());
	}

	function respondToRequest(respondData) {
		return $http.put(serviceUrl + 'requests/' + respondData.requestId
		 + '?status=' + respondData.status, getConfig());
	}

	function makeFriendRequest(requestData) {
		return $http.post(serviceUrl + 'requests/' + requestData.username, null, getConfig());
	}

	return {
		myInfo: myInfo,
		getFriendRequests: getFriendRequests,
		getFeedNews: getFeedNews,
		getMyFriends: getMyFriends,
		makeFriendRequest: makeFriendRequest,
		changePassword: changePassword,
		changeMyInfo: changeMyInfo
	};
});
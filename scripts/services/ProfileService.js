var socialNetwork = socialNetwork || angular.module('socialNetworkApp', ['ngRoute']);

socialNetwork.factory('ProfileService', function(baseUrl, getConfig, $q, $http) {
	var serviceUrl = baseUrl + "me/";

	function getProfile() {
		return $http.get(serviceUrl, getConfig());
	}

	function editProfile(userData) {
		return $http.put(serviceUrl, userData, getConfig());
	}

	function changePassword(passwordData) {
		return $http.put(serviceUrl + 'ChangePassword', passwordData, getConfig());
	}

	function getFriends() {
		return $http.get(serviceUrl + 'friends', getConfig());
	}

	function getFriendsPreview() {
		return $http.get(serviceUrl + 'friends/preview', getConfig());
	}

	function getFeedNews(newsData) {
		return $http.get(serviceUrl + 'feed?StartPostId=' + newsData.startPostId + '&PageSize=' + newsData.pageSize, getConfig());
	}

	function getFriendRequests(respondData) {
		return $http.get(serviceUrl + 'requests', getConfig());
	}

	function respondToRequest(respondData) {
		return $http.put(serviceUrl + 'requests/' + respondData.requestId
		 + '?status=' + respondData.status, null, getConfig());
	}

	function makeFriendRequest(requestData) {
		return $http.post(serviceUrl + 'requests/' + requestData.username, null, getConfig());
	}

	return {
		getProfile: getProfile,
		getFriendRequests: getFriendRequests,
		getFeedNews: getFeedNews,
		getFriends: getFriends,
		getFriendsPreview: getFriendsPreview,
		makeFriendRequest: makeFriendRequest,
		respondToRequest: respondToRequest,
		changePassword: changePassword,
		editProfile: editProfile
	};
});
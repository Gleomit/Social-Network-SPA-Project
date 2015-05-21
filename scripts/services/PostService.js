var socialNetwork = socialNetwork || angular.module('socialNetworkApp', ['ngRoute']);

socialNetwork.factory('PostService', function(baseUrl, $q, $http) {
	var serviceUrl = baseUrl + 'Posts/';

	function getPost(id) {
		return $http.get(serviceUrl + id);
	}

	function getPostLikes(id) {
		return $http.get(serviceUrl + id + '/likes');
	}

	function getPostLikesPreview(id) {
		return $http.get(serviceUrl + id + '/likes/preview');
	}

	function likePost(id) {
		return $http.post(serviceUrl + id + '/likes', null);
	}

	function unlikePost(id) {
		return $http.delete(serviceUrl + id + '/likes');
	}

	function createPost(postData) {
		return $http.post(serviceUrl, postData);
	}

	function editPost(id) {
		return $http.put(serviceUrl + id);
	}

	function deletePost(id) {
		return $http.delete(serviceUrl + id);
	}
	
	return {

	};
});
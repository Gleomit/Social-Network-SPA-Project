var socialNetwork = socialNetwork || angular.module('socialNetworkApp', ['ngRoute']);

socialNetwork.factory('PostService', [function(baseUrl, $q, $http) {
	var serviceUrl = baseUrl + 'Posts/';

	var config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	function getPost(id) {
		return $http.get(serviceUrl + id, config);
	}

	function getPostLikes(id) {
		return $http.get(serviceUrl + id + '/likes', config);
	}

	function getPostLikesPreview(id) {
		return $http.get(serviceUrl + id + '/likes/preview', config);
	}

	function likePost(id) {
		return $http.post(serviceUrl + id + '/likes', null, config);
	}

	function unlikePost(id) {
		return $http.delete(serviceUrl + id + '/likes', config);
	}

	function createPost(postData) {
		return $http.post(serviceUrl, postData, config);
	}

	function editPost(id) {
		return $http.put(serviceUrl + id, config);
	}

	function deletePost(id) {
		return $http.delete(serviceUrl + id, config);
	}
	
	return {

	};
}])
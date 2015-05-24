var socialNetwork = socialNetwork || angular.module('socialNetworkApp', ['ngRoute']);

socialNetwork.factory('PostService', function(baseUrl, getConfig, $q, $http) {
	var serviceUrl = baseUrl + 'Posts/';

	function getPost(id) {
		return $http.get(serviceUrl + id, getConfig());
	}

	function getPostLikes(id) {
		return $http.get(serviceUrl + id + '/likes', getConfig());
	}

	function getPostLikesPreview(id) {
		return $http.get(serviceUrl + id + '/likes/preview', getConfig());
	}

	function likePost(id) {
		return $http.post(serviceUrl + id + '/likes', null, getConfig());
	}

	function unlikePost(id) {
		return $http.delete(serviceUrl + id + '/likes', getConfig());
	}

	function createPost(postData) {
		return $http.post(serviceUrl, postData, getConfig());
	}

	function editPost(data) {
		return $http.put(serviceUrl + data.id, data, getConfig());
	}

	function deletePost(id) {
		return $http.delete(serviceUrl + id, getConfig());
	}

	return {
		createPost: createPost,
		deletePost: deletePost,
		likePost: likePost,
		unlikePost: unlikePost,
		editPost: editPost,
		getPostLikesPreview: getPostLikesPreview,
		getPostLikes: getPostLikes,
		getPost: getPost
	};
});
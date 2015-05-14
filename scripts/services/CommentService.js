var socialNetwork = socialNetwork || angular.module('socialNetworkApp', ['ngRoute']);

socialNetwork.factory('CommentService', [function($q, $http) {
	var serviceUrl = baseUrl + 'Posts/';

	var config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	function getComments(postId) {
		return $http.get(serviceUrl + id + '/comments', config);
	}

	function commentPost(postId, commentData) {
		return $http.post(serviceUrl + id + '/comments', commentData, config);
	}

	function editComment(postId, commentId, commentData) {
		return $http.put(serviceUrl + id + '/comments/' + commentId, commentData, config);
	}

	function deleteComment(postId, commentId) {
		return $http.delete(serviceUrl + id + '/comments/' + commentId, config);
	}

	function getCommentLikes(postId, commentId) {
		return $http.get(serviceUrl + id + '/comments' + commentId + '/likes', config);
	}

	function getCommentLikes(postId, commentId) {
		return $http.get(serviceUrl + id + '/comments' + commentId + '/likes/preview', config);
	}

	function getPostLikesPreview(id) {
		return $http.get(serviceUrl + id + '/likes/preview', config);
	}

	function likeComment(postId, commentId) {
		return $http.post(serviceUrl + id + '/comments' + commentId + '/likes', null, config);
	}

	function unlikeComment(postId, commentId) {
		return $http.delete(serviceUrl + id + '/comments' + commentId + '/likes', config);
	}

	return {

	};
}])
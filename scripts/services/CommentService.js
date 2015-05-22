var socialNetwork = socialNetwork || angular.module('socialNetworkApp', ['ngRoute']);

socialNetwork.factory('CommentService', function($q, $http, getConfig) {
	var serviceUrl = baseUrl + 'Posts/';

	function getComments(postId) {
		return $http.get(serviceUrl + id + '/comments', getConfig());
	}

	function commentPost(postId, commentData) {
		return $http.post(serviceUrl + id + '/comments', commentData, getConfig());
	}

	function editComment(postId, commentId, commentData) {
		return $http.put(serviceUrl + id + '/comments/' + commentId, commentData, getConfig());
	}

	function deleteComment(postId, commentId) {
		return $http.delete(serviceUrl + id + '/comments/' + commentId, getConfig());
	}

	function getCommentLikes(postId, commentId) {
		return $http.get(serviceUrl + id + '/comments' + commentId + '/likes', getConfig());
	}

	function getCommentLikes(postId, commentId) {
		return $http.get(serviceUrl + id + '/comments' + commentId + '/likes/preview', getConfig());
	}

	function getPostLikesPreview(id) {
		return $http.get(serviceUrl + id + '/likes/preview', getConfig());
	}

	function likeComment(postId, commentId) {
		return $http.post(serviceUrl + id + '/comments' + commentId + '/likes', null, getConfig());
	}

	function unlikeComment(postId, commentId) {
		return $http.delete(serviceUrl + id + '/comments' + commentId + '/likes', getConfig());
	}

	return {

	};
});
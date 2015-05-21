var socialNetwork = socialNetwork || angular.module('socialNetworkApp', ['ngRoute']);

socialNetwork.factory('CommentService', function($q, $http) {
	var serviceUrl = baseUrl + 'Posts/';

	function getComments(postId) {
		return $http.get(serviceUrl + id + '/comments');
	}

	function commentPost(postId, commentData) {
		return $http.post(serviceUrl + id + '/comments', commentData);
	}

	function editComment(postId, commentId, commentData) {
		return $http.put(serviceUrl + id + '/comments/' + commentId, commentData);
	}

	function deleteComment(postId, commentId) {
		return $http.delete(serviceUrl + id + '/comments/' + commentId);
	}

	function getCommentLikes(postId, commentId) {
		return $http.get(serviceUrl + id + '/comments' + commentId + '/likes');
	}

	function getCommentLikes(postId, commentId) {
		return $http.get(serviceUrl + id + '/comments' + commentId + '/likes/preview');
	}

	function getPostLikesPreview(id) {
		return $http.get(serviceUrl + id + '/likes/preview');
	}

	function likeComment(postId, commentId) {
		return $http.post(serviceUrl + id + '/comments' + commentId + '/likes', null);
	}

	function unlikeComment(postId, commentId) {
		return $http.delete(serviceUrl + id + '/comments' + commentId + '/likes');
	}

	return {

	};
});
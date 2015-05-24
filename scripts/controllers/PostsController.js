socialNetwork.controller('PostsController', function($scope, $routeParams, UserService,
	PostService, CommentService) {

	$scope.previewUser = function(user) {

	};

	$scope.likeComment = function(post, comment) {
		CommentService.likeComment(post.id, comment.id)
			.then(function(result){
				comment.liked = true;
				comment.likesCount += 1;
				console.log(result);
			}, function(error){
				console.log(error);
			});
	};

	$scope.makeComment = function(event) {

	};

	$scope.unlikeComment = function(post, comment) {
		CommentService.unlikeComment(post.id, comment.id)
			.then(function(result){
				comment.liked = false;
				comment.likesCount -= 1;
				console.log(result);
			}, function(error){
				console.log(error);
			});
	};

	$scope.editComment = function(event) {

	};

	$scope.deleteComment = function(post, comment) {
		CommentService.deleteComment(post.id, comment.id)
			.then(function(result){
				post.comments.splice(post.comments.indexOf(comment), 1);
				console.log(result);
			}, function(error){
				console.log(error);
			});
	};

	$scope.likePost = function(post) {
		PostService.likePost(post.id)
			.then(function(result){
				post.liked = true;
				post.likesCount += 1;
				console.log(result);
			}, function(error){
				console.log(error);
			});
	};

	$scope.unlikePost = function(post) {
		PostService.unlikePost(post.id)
			.then(function(result){
				post.liked = false;
				post.likesCount -= 1;
				console.log(result);
			}, function(error){
				console.log(error);
			});
	};

	$scope.editPost = function(event) {

	};

	$scope.makePost = function(message) {
		var data = {
			postContent: message,
			username: $scope.myProfile.username
		};

		PostService.createPost(data)
			.then(function(result) {
				console.log(result);
			}, function(error) {
				console.log(error);
			});
	};

	$scope.deletePost = function(post) {
		event.preventDefault();
		PostService.deletePost(post.id)
			.then(function(result){
				$scope.news.splice($scope.news.indexOf(post), 1);
			}, function(error){

			});
	};

	$scope.showCommentLikes = function(post, comment){
		CommentService.getCommentLikes(post.id, comment.id)
			.then(function(result){
				$scope.commentLikes = result.data;
				console.log(result);
			}, function(error){
				console.log(error);
			});
	};

	$scope.showPostLikes = function(post){
		PostService.getPostLikes(post.id)
			.then(function(result){
				$scope.postLikes = result.data;
				console.log(result);
			}, function(error){
				console.log(error);
			});
	};
});
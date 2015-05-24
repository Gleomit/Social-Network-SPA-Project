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

	$scope.makeComment = function(post, commentContent) {
		CommentService.createComment(post.id, commentContent)
			.then(function(result){
				console.log(result);
			}, function(error){
				console.log(error);
			});
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

	$scope.editComment = function(comment) {
		CommentService.editPost(comment.belongPost.id, comment.id, comment.commentContent)
			.then(function(result){
				console.log(result);
			}, function(error){
				console.log(error);
			});

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

	$scope.editPost = function(post) {
		var data = {
			id: post.id,
			postContent: post.postContent
		};

		PostService.editPost(data)
			.then(function(result){
				console.log(result);
			}, function(error){
				console.log(error);
			});
	};

	$scope.deletePost = function(post) {
		PostService.deletePost(post.id)
			.then(function(result){
				$scope.$parent.newsFeed.splice($scope.$parent.newsFeed.indexOf(post), 1);
				console.log(result);
			}, function(error){
				console.log(error);
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

	$scope.showEditPost = function(post){
		$scope.postToEdit = post;
	};

	$scope.showCommentEdit = function(post, comment){
		$scope.postToEdit = comment;
		$scope.postToEdit.belongPost = post;
	};
});
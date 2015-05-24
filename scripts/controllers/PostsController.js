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

	$scope.makeComment = function(post) {
		CommentService.createComment(post.id, {commentContent: post.commentBox})
			.then(function(result){
				post.commentBox = "";
				post.totalCommentsCount += 1;
				post.comments.unshift(result.data);
				if(post.comments.length > 3){
					post.comments.splice(post.commentBox.length - 1, 1);
				}
				$('#' + post.id).slideUp();
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
		CommentService.editComment(comment.belongPost.id, {id: comment.id, commentContent: comment.commentContent})
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
				post.totalCommentsCount -= 1;
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
				NotificationService.successNoty('Successfully deleted post');
				$scope.$parent.newsFeed.splice($scope.$parent.newsFeed.indexOf(post), 1);
				console.log(result);
			}, function(error){
				NotificationService.errorNoty('Error during deleting post');
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
		$scope.commentToEdit = comment;
		$scope.commentToEdit.belongPost = post;
	};

	$scope.showAddComment = function(selector){
		$('#' + selector).slideToggle();
	}

	$scope.getAllComents = function(post){
		CommentService.getComments(post.id)
			.then(function(result){
				console.log(result);
				post.shownAllComments = true;
				post.comments = result.data;
			}, function(error){
				console.log(error);
			});
	};
});
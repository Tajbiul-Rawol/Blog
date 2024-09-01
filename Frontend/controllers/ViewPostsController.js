app.controller('ViewPostsController', function($scope, $http) {
    $scope.posts = [];
    $scope.selectedPost = {};

    $scope.fetchPosts = function() {
        $http.get(`${BASE_URL}/api/posts`).then(response => {
            $scope.posts = response.data;
        });
    };

    $scope.deletePost = function(id) {
        if(confirm('Are you sure you want to delete this post?')) {
            $http.delete(`${BASE_URL}/api/posts/${id}`).then(response => {
            showToast(response.data, 'danger');
                $scope.posts = $scope.posts.filter(p => p.id !== id);
            }).catch(error => {
                $('#actionToast .toast-body').text('Post deleted successfully!');
                $('#actionToast').toast('show');
            });
        }
    };

    // Update an existing post
    $scope.selectPost = function(post) {
        $scope.selectedPost = angular.copy(post); // Use angular.copy to avoid direct binding
    };

    //open the modal
    $scope.openModal = function(post){
        $scope.selectPost(post);
        $('#updateModal').modal('show');
    };

    $scope.updatePost = function () {
        
        console.log($scope.selectedPost);
        if (!$scope.selectedPost) return;
        
        if (!$scope.selectedPost.title || !$scope.selectedPost.content) {
            alert('Title and content are required');
            return;
        }
        if(!$scope.selectedPost.author){
            alert('author is required');
            return;
        }

        $http.put(`${BASE_URL}/api/posts/${$scope.selectedPost.id}`, $scope.selectedPost).then(response => {
            const index = $scope.posts.findIndex(p => p.id === $scope.selectedPost.id);
            $scope.posts[index] = response.data;
            console.log(response) 
            $('#updateModal').modal('hide');
            $('#actionToast .toast-body').text('Post updated successfully!');
            $('#actionToast').toast('show');
        }).catch(error => {
            showToast(error.data.error, 'danger');
        });
    }

    $scope.fetchPosts(); // Fetch posts on controller initialization
});

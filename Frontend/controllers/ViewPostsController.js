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
                $scope.posts = $scope.posts.filter(p => p.id !== id);
            }).catch(error => {
                alert('Error deleting post: ' + error.data.error);
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

        $http.put(`${BASE_URL}/api/posts/${$scope.selectedPost.id}`, $scope.selectedPost).then(response => {
            const index = $scope.posts.findIndex(p => p.id === $scope.selectedPost.id);
            $scope.posts[index] = response.data;
            $('#updateModal').modal('hide');
        }).catch(error => {
            alert('Error updating post: ' + error.data.error);
        });
    }


    $scope.fetchPosts(); // Fetch posts on controller initialization
});

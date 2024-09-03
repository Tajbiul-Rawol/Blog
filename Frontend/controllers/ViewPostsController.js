app.controller('ViewPostsController', function($scope, $http, BASE_URL) {
    $scope.posts = [];
    $scope.selectedPost = {};
    $scope.searchQuery = '';


    $scope.fetchPosts = function() {
        $http.get(`${BASE_URL}/api/posts`).then(response => {
            $scope.posts = response.data.sort((a, b) => b.id - a.id);
        });
    };

    $scope.deletePost = function(id) {
        if(confirm('Are you sure you want to delete this post?')) {
            $http.delete(`${BASE_URL}/api/posts/${id}`).then(response => {
                $('#actionToast .toast-body').text('Post deleted successfully!');
                $('#actionToast').toast('show');
                $scope.posts = $scope.posts.filter(p => p.id !== id);
            }).catch(error => {
                $('#actionToast .toast-body').text('Could not delete post!');
                $('#actionToast').toast('show');
            });
        }
    };

    $scope.SearchPost = (query)=>{

        if (!$scope.searchQuery) {
            return;
        }
         // Construct the query parameter
         const queryParam = encodeURIComponent($scope.searchQuery);
        console.log($scope.searchQuery);
        $http.get(`${BASE_URL}/api/posts?searchString=${queryParam}`).then(response => {
            $scope.posts = response.data.sort((a, b) => b.id - a.id);
        });
    }

    // Update an existing post
    $scope.selectPost = function(post) {
        $scope.selectedPost = angular.copy(post); // Use angular.copy to avoid direct binding
    };

    //open the modal
    $scope.openModal = function(post){
        $scope.selectPost(post);
        $('#updateModal').modal('show');
    };

    $scope.openPost = function(post,event){
        console.log(post);
        event.preventDefault();
         // Perform your custom action here, such as redirecting
        window.location.href = `${BASE_URL}/post.html?id=${post.id}`;
    }

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

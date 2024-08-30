const app = angular.module('blogApp',[]);

const BASE_URL = 'http://localhost:3000';

app.controller('BlogController',function($scope,$http){

    $scope.posts = [];
    $scope.newPost = {};
    $scope.selectedPost = null;

    //fetch all posts
    $scope.fetchPosts = function(){
        $http.get(`${BASE_URL}/api/posts`).then(response => {
            $scope.posts = response.data;
        });
    }

    // Create a new post
    $scope.createPost = function() {
        if (!$scope.newPost.title || !$scope.newPost.content) {
            alert('Title and content are required');
            return;
        }

        $http.post(`${BASE_URL}/api/posts`, $scope.newPost).then(response => {
            console.log(response.data.data);
            $scope.posts.push(response.data.data);
            $scope.newPost = {}; // Reset the form
        });
    };
    // Update an existing post
    $scope.updatePost = function() {
        if (!$scope.selectedPost) return;

        $http.put(`${BASE_URL}/api/posts/${$scope.selectedPost.id}`, $scope.newPost).then(response => {
            const index = $scope.posts.findIndex(p => p.id === $scope.selectedPost.id);
            $scope.posts[index] = response.data;
            $scope.resetForm(); // Reset the form
        }).catch(error => {
            alert('Error updating post: ' + error.data.error);
        });
    };

    // Delete a post
    $scope.deletePost = function(id) {
        if(confirm(`Are you sure you want to delete this data?`)){
            $http.delete(`${BASE_URL}/api/posts/${id}`).then(response => {
                $scope.posts = $scope.posts.filter(p => p.id !== id);
                $scope.resetForm();
            });
        }
    };

    // Select a post to edit
    $scope.selectPost = function(post) {
        $scope.selectedPost = angular.copy(post);
        $scope.newPost = angular.copy(post);
    };

    // Reset the form
    $scope.resetForm = function() {
        $scope.newPost = {};
        $scope.selectedPost = null;
    };

    // Initialize the controller by fetching posts
    $scope.fetchPosts();

})
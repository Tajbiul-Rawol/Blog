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
        $scope.posts.push(response.data);
        $scope.newPost = {}; // Reset the form
        });
    };

    // Initialize the controller by fetching posts
    $scope.fetchPosts();

})
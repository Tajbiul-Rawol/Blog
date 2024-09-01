app.controller('CreatePostController', function($scope, $http) {
    $scope.newPost = {};

    $scope.createPost = function() {
        if (!$scope.newPost.title || !$scope.newPost.content) {
            alert('Title and content are required');
            return;
        }

        $http.post(`${BASE_URL}/api/posts`, $scope.newPost).then(response => {
            console.log(response.data.data);
            $scope.newPost = {}; // Reset the form
        }).catch(error => {
            alert('Error creating post: ' + error.data.error);
        });
    };
});

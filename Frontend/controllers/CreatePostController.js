app.controller('CreatePostController', function($scope, $http) {
    $scope.newPost = {};

    $scope.createPost = function() {
        if (!$scope.newPost.title || !$scope.newPost.content) {
            alert('Title and content are required');
            return;
        }
        if(!$scope.newPost.author){
            alert('author is required');
            return;
        }

        $http.post(`${BASE_URL}/api/posts`, $scope.newPost).then(response => {
            console.log(response.data.data);
            // Show success toast
            $('#createToast .toast-body').text('Post created successfully!');
            $('#createToast').toast('show');
            $scope.newPost = {}; // Reset the form
        }).catch(error => {
            // Show success toast
            $('#createToast .toast-body').text('Error! could not create post!');
            $('#createToast').toast('show');
        });
    };

});

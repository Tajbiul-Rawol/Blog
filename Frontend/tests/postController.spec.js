describe('PostController Basic Test', function() {
    var $controller, $scope,$httpBackend;;

    // Load the module
    beforeEach(module('blogApp')); // Ensure this matches your AngularJS module name

    // Inject the dependencies
    beforeEach(inject(function(_$controller_, _$rootScope_,_$httpBackend_) {
        $controller = _$controller_;
        $scope = _$rootScope_.$new();
        $httpBackend = _$httpBackend_;
        $controller('CreatePostController', { $scope: $scope });
    }));

    it('should have a defined controller', function() {
        expect($scope).toBeDefined();
    });

    it('should alert if title is missing', function() {
        spyOn(window, 'alert'); // Mock alert
        $scope.newPost = { content: 'Some content', author: 'Author' };
        $scope.createPost();
        expect(window.alert).toHaveBeenCalledWith('Title and content are required');
    });

    it('should alert if content is missing', function() {
        spyOn(window, 'alert'); // Mock alert
        $scope.newPost = { title: 'Some title', author: 'Author' };
        $scope.createPost();
        expect(window.alert).toHaveBeenCalledWith('Title and content are required');
    });


    it('should alert if author is missing', function() {
        spyOn(window, 'alert'); // Mock alert
        $scope.newPost = { title: 'Some title', content: 'Some content' };
        $scope.createPost();
        expect(window.alert).toHaveBeenCalledWith('author is required');
    });

    // it('should call $http.post and reset form on successful creation', function() {
    //     // Mock HTTP response
    //     $httpBackend.whenPOST(`${BASE_URL}/api/posts`).respond(200, { data: { } });
    //     spyOn(window, 'alert'); // Mock alert

    //     $scope.newPost = { title: 'Some title', content: 'Some content', author: 'Author' };
    //     $scope.createPost();

    //     // Expect the HTTP post request to be made
    //     $httpBackend.flush();

    //     // Check that the form is reset
    //     expect($scope.newPost).toEqual({});
    //     expect($('#createToast .toast-body').text()).toBe('Post created successfully!');
    // });

});

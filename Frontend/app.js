const app = angular.module('blogApp', ['ui.router']);

const BASE_URL = 'http://localhost:3000';

// Configure routes
app.config(function($stateProvider, $urlRouterProvider,$locationProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('createPost', {
            url: '/createPost',
            templateUrl: 'templates/createPost.html',
            controller: 'CreatePostController'
        })
        .state('viewPosts', {
            url: '/viewPosts',
            templateUrl: 'templates/viewPosts.html',
            controller: 'ViewPostsController'
        });
        
        // $locationProvider.html5Mode({
        //     enabled: true,
        //     requireBase: false
        // });
});


//initialize the app
app.run(function($http) {
    $http.defaults.headers.common['Content-Type'] = 'application/json';
});
module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', 'angular'],
        files: [
            // // Load AngularJS and Angular Mocks from the CDN
            // { pattern: 'https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js', included: false },
            // { pattern: 'https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular-mocks.js', included: false },
            // // Load your app files and test files
            // 'FrontEnd/app.js',
            // 'FrontEnd/controllers/CreatePostController.js',
            // 'FrontEnd/tests/postController.spec.js'

             // Load AngularJS and Angular Mocks from the CDN
                { pattern: 'https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js', included: false },
                { pattern: 'https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular-mocks.js', included: false },
                { pattern: 'https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/1.0.29/angular-ui-router.min.js', included:false},
                'app.js',
                'controllers/*.js',
                'tests/**/*.spec.js'
        ],
        preprocessors: {
            'app.js': ['coverage'],
            'controllers/*.js': ['coverage'],
            'tests/**/*.spec.js': ['coverage']
        },
        reporters: ['progress', 'coverage'],
        coverageReporter: {
            type: 'html',
            dir: 'coverage/'
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false,
        concurrency: Infinity
    });
};

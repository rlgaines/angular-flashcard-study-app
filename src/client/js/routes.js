(function() {

    'use strict';

    angular.module('myApp')
        .config(appConfig)
        .run(routeChange);

    appConfig.$inject = ['$routeProvider', '$httpProvider'];
    routeChange.$inject = ['$rootScope', '$location', '$window'];


    function appConfig($routeProvider, $httpProvider) {
        $routeProvider
            .when('/:id/decks', {
                templateUrl: 'templates/main.html',
                controller: 'deckController',
                restricted: true,
                preventLoggedIn: false
            })
        //needs /:id/ infront
        .when('/:id/new', {
            templateUrl: 'templates/newdeck.html',
            controller: 'newDeckController',
            restricted: true,
            preventLoggedIn: false
        })
            .when('/:id/add', {
                templateUrl: 'templates/addQuiz.html',
                controller: 'addQuiz',
                restricted: true,
                preventLoggedIn: false
            })
            .when('/:id/quiz', {
                templateUrl: 'templates/quiz.html',
                controller: 'quizController',
                restricted: true,
                preventLoggedIn: false
            })
            .when('/register', {
                templateUrl: 'templates/register.html',
                controller: 'registerController',
                restricted: false,
                preventLoggedIn: true
            })
            .when('/login', {
                templateUrl: 'templates/login.html',
                controller: 'loginController',
                restricted: false,
                preventLoggedIn: true
            })
            .when('/logout', {
                restricted: false,
                preventLoggedIn: false,
                resolve: {
                    test: function(authService, $rootScope, $location) {
                        authService.logout();
                        $rootScope.currentUser = authService.getUserInfo();
                        $location.path('/login');
                    }
                }
            })
            .otherwise({
                redirectTo: '/login'
            });
        // $httpProvider.interceptors.push('authInterceptor');
    }

    function routeChange($rootScope, $location, $window, authService) {
        $rootScope.$on('$routeChangeStart', function(event, next, current) {
            // if route us restricted and no token is present
            if (next.restricted && !$window.localStorage.getItem('token')) {
                $location.path('/login');
            }
            // if token and prevent logging in is true
            if (next.preventLoggedIn && $window.localStorage.getItem('token')) {
                $location.path('/');
            }
        });
    }

})();
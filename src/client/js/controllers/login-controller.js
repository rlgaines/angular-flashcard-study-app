(function() {

    'use strict';

    angular.module('myApp')
        .controller('loginController', loginController);

    loginController.$inject = ['$rootScope', '$scope', '$location', 'authService'];


    //checks user is in DB and sets token for login
    function loginController($rootScope, $scope, $location, authService) {
        $scope.user = {};
        $scope.login = function() {
            authService.login($scope.user)
                .then(function(user) {
                    console.log("Login Con:", user)
                    user.id = user.data.data.user
                    authService.setUserInfo(user);
                    $location.path('/' + user.id + '/decks');
                    $rootScope.currentUser = authService.getUserInfo();
                })
                .catch(function(err) {
                    // check status code, send appropriate message
                    console.log('ERR:', err);
                });
        };
    }

})();



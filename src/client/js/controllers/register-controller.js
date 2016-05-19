(function () {

  'use strict';

  angular.module('myApp')
    .controller('registerController', registerController);

  registerController.$inject = ['$rootScope', '$scope', '$location', 'authService'];

  function registerController($rootScope, $scope, $location, authService) {
    $scope.user = {};
    $scope.register = function() {
      console.log($scope.user)
      authService.register($scope.user)
        .then(function(user) {
          console.log('Reg Con:', user)
          user.id = user.data.data
          authService.setUserInfoReg(user);
          $location.path('/'+user.id+'/decks');
          $rootScope.currentUser = authService.getUserInfo();
        })
        .catch(function(err) {
          // check status code, send appropriate message
          console.log(err);
        });
    };
  }

})();
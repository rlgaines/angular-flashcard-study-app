(function () {

  'use strict';


  angular.module('myApp')
    .service('newDeckService', newDeckService);

  newDeckService.$inject = ['$http', '$window'];

  function newDeckService($http, $window) {
    var user = {};
    return {
      moreQuestions: function() {
          
      }
    };
  }

})();
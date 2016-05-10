(function () {

  'use strict';


  angular.module('myApp')
    .service('newDeckService', newDeckService);

  newDeckService.$inject = ['$http', '$window'];

  function newDeckService($http, $window) {
    var data = {};
    return {

      newDeck: function(data) {
        return $http.post('/new', data);
        console.log('service:',data)
      },

      moreQuestions: function(data) {
        return $http.post('/new', data)
        console.log('service:',data)
      }
    };
  }

})();
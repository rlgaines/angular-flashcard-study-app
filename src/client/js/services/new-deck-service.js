(function () {

  'use strict';


  angular.module('myApp')
    .service('newDeckService', newDeckService);

  newDeckService.$inject = ['$http', '$window'];

  function newDeckService($http, $window) {
    var data = {};
    return {

      newDeck: function(data, id) {
        return $http.post('/'+ id +'/new', data);
        console.log('service:',data)
      },

      moreQuestions: function(data, id) {
        return $http.post('/'+ id +'/new', data)
        console.log('service:',data)
      }
    };
  }

})();
(function () {

  'use strict';


  angular.module('myApp')
    .service('deckService', deckService);

  deckService.$inject = ['$http', '$window'];

  function deckService($http, $window) {
    var user = {};
    return {
      getDecks: function(id) {
        return $http.get('/'+ id+'/decks');
      },

      getSingleDeck: function(id){
        return $http.get('/'+id +'/quiz');
      }
    };
  }

})();
(function () {

  'use strict';


  angular.module('myApp')
    .service('deckService', deckService);

  deckService.$inject = ['$http', '$window'];

  function deckService($http, $window) {
    var user = {};
    return {
      getDecks: function() {
        // console.log('user')
        return $http.get('/decks');
      },

      getSingleDeck: function(id){
        return $http.get('/'+id +'/quiz');
      }
    };
  }

})();
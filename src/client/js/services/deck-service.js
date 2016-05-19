(function () {

  'use strict';


  angular.module('myApp')
    .service('deckService', deckService);

  deckService.$inject = ['$http', '$window'];

  function deckService($http, $window) {
    var currentID = {};

    return {
      getDecks: function(id) {
        var id = id
      return $http.get('/'+ id +'/decks')
      },
      paused: function(data){
            currentID = data       
       },
       getID: function(){
        return currentID
       },

      getSingleDeck: function(id){
        // console.log('id:', id)
        return $http.get('/'+id+'/quiz');
      },

      addRecommendedDeck: function(data, id){
        return $http.post('/'+ id +'/add', data)
      }
    };
  }

})();
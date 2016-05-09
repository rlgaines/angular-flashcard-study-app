(function(){
	'use strict';

	angular.module('myApp')
	  .controller('deckController', deckController);

	deckController.$inject = ['$rootScope', '$scope', 'deckService'];
	
	function deckController($rootScope, $scope, deckService) {
		$scope.decks = {};
		deckService.getDecks()
		  .then(function(decks){
		  	console.log(decks.data)
		  	return $scope.flashcards = decks.data
		  })
	}  
})();
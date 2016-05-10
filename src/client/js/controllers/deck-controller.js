(function(){
	'use strict';

	angular.module('myApp')
	  .controller('deckController', deckController);

	deckController.$inject = ['$rootScope', '$scope', 'deckService', '$routeParams'];
	
	function deckController($rootScope, $scope, deckService, $routeParams) {
		$scope.decks = {};
		deckService.getDecks()
		  .then(function(decks){
		  	return $scope.flashcards = decks.data
		  	// decks.data where deck.user_id == AuthService.getUser().id;
		  })



		$scope.pullDeck = function(data) {
			$scope.deck = {};  
			deckService.getSingleDeck(data) 
		  		.then(function(deck){
		  			console.log('single', deck.data)
		  	 $scope.quiz = deck.data
		  }) 
		}

		if($routeParams.id){
		$scope.pullDeck($routeParams.id);
		}	

	}  
})();



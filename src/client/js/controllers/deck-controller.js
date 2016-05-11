(function(){
	'use strict';

	angular.module('myApp')
	  .controller('deckController', deckController);

	deckController.$inject = ['$rootScope', '$scope', 'deckService', '$routeParams', 'authService'];
	
	function deckController($rootScope, $scope, deckService, $routeParams, authService) {
		$scope.decks = {};
		// $scope.userId = authService.getUserId()
		// console.log($scope.userId)

		deckService.getDecks($routeParams.id)
		  .then(function(decks){
		  	// console.log(decks.data)
		  	return $scope.flashcards = decks.data
		  	// decks.data where deck.user_id == AuthService.getUser().id;
		  })



		$scope.pullDeck = function(data) {
			$scope.deck = {};  
			deckService.getSingleDeck(data) 
		  		.then(function(deck){
		  			// console.log('single', deck.data)
		  	 $scope.quiz = deck.data
		  }) 
		}

		if($routeParams.id){
		$scope.pullDeck($routeParams.id);
		}	

	}  
})();



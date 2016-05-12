(function(){
	'use strict';

	angular.module('myApp')
	  .controller('addQuiz', addQuiz);

	addQuiz.$inject = ['$rootScope', '$scope', '$location', 'deckService','addQuizService', '$routeParams'];
	
	//will add a new quiz/deck to your page for quizing from recommended directive
	function addQuiz($rootScope, $scope, $location, deckService, addQuizService, $routeParams) {
		$scope.pullDeck = function(data) {
			$scope.deck = {};  
			deckService.getSingleDeck(data) 
		  		.then(function(deck){
		  	 $scope.quiz = deck.data
		  }) 
		}
	}  
})();
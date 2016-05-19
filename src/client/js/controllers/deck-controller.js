(function(){
	'use strict';

	angular.module('myApp')
	  .controller('deckController', deckController);

	deckController.$inject = ['$rootScope', '$scope', 'deckService', '$routeParams', 'authService'];
	
	function deckController($rootScope, $scope, deckService, $routeParams, authService) {
		$scope.decks = {};
		$scope.recommendedQuiz = [];
		$scope.userId = authService.getUserId()
		// console.log('user',$scope.userId)


		//gets all decks 
		deckService.getDecks($scope.userId)
           .then(function(data){
            	var notIncluded = [];
            	var included = [];
            	var names = [];
	            	
	            //checks ID to split decks by ID
	            function checkId(el){
	              if (el.user_id != $scope.userId){
	                  notIncluded.push(el)
	                  names.push(el.name)
	                } else {
	                  included.push(el)
	                }
	              }
	          	data.data.forEach(checkId)
	             $scope.notIncluded = notIncluded;
	             $scope.included = included;
      		})


           //pulls deck for user who does not have that deck yet 
			$scope.pullDeck = function(data) {
				// console.log(data)
				$scope.deck = {}; 
				$scope.singleDeck = [];
					deckService.getSingleDeck(data.id) 
				  	.then(function(deck){
				  		console.log(deck)
						$scope.quiz = deck.data
						$scope.singleDeck.push(deck.data[0])
						// console.log('WORK',$scope.singleDeck)
					}) 
			}
			// if($routeParams.id){
			// 	$scope.pullDeck($routeParams.id);
			// }	



			//duplicates deck user wants to add to deck
			$scope.addRecommendedDeck = function(data){
				// console.log('NEW:',data)
				deckService.addRecommendedDeck($scope.quiz, $scope.userId)
			}	
	}  
})();



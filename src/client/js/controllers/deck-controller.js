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

		deckService.getDecks($scope.userId)
           .then(function(data){
            	var notIncluded = [];
            	var included = [];
            	var names = [];

	            function checkId(el){
	              if (el.user_id != $scope.userId){
	                  notIncluded.push(el)
	                  names.push(el.name)
	                } else {
	                  included.push(el)
	                }
	              }
	          	data.data.forEach(checkId)
	          	$scope.notIncluded = notIncluded.filter(function(deck){
	          		if (names.indexOf(deck.name) !== -1 ){
	          			return deck.name
	          		}
	          	})
	          	// return an array of names from included
	          	// var names = ["CSS", "HTML 5"];
	          	// notIncluded = notIncluded.filter(function (deck) {
	          		// check deck name isn't inside of included
	          		// names.indexOf(deck.name) !== -1
	          	// });
	             // $scope.notIncluded = notIncluded;
	             $scope.included = included;
      		})



			$scope.pullDeck = function(data) {
				$scope.deck = {};  
				$scope.singleDeck = [];
				deckService.getSingleDeck(data) 
			  		.then(function(deck){
			  	 $scope.quiz = deck.data
			  	 // console.log(deck.data[0])
			  	 $scope.singleDeck.push(deck.data[0])
			  }) 
			}

			if($routeParams.id){
				$scope.pullDeck($routeParams.id);
				}	




			$scope.addRecommendedDeck = function(data){
				// console.log('NEW:',data)
				deckService.addRecommendedDeck($scope.quiz, $scope.userId)
			}	
	}  
})();



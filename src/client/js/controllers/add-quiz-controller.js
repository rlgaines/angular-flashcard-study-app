(function(){
	'use strict';

	angular.module('myApp')
	  .controller('addQuiz', addQuiz);

	addQuiz.$inject = ['$rootScope', '$scope', '$location', 'deckService', '$routeParams', 'authService'];
	
	//will add a new quiz/deck to your page for quizing from recommended directive
	function addQuiz($rootScope, $scope, $location, deckService, $routeParams, authService) {
		// console.log($routeParams.id)
		$scope.pullDeckAddQuiz = function(data) {
			// console.log('Data',data)
			deckService.paused(data.id) 
		  }
		
		$scope.singleDeck = deckService.getSingleDeck($routeParams.id)
		.then(function(info){
			$scope.allInfo = info.data
			$scope.singleDeck = info.data[0]
		});



		$scope.userId = authService.getUserId()

		
		//duplicates deck user wants to add to deck
			$scope.addRecommendedDeck = function(data){
				console.log('NEW:',data)
				deckService.addRecommendedDeck($scope.allInfo, $scope.userId)
			}

	}  


})();
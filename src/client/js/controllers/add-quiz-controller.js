(function(){
	'use strict';

	angular.module('myApp')
	  .controller('addQuiz', addQuiz);

	addQuiz.$inject = ['$rootScope', '$scope', '$location', 'deckService', '$routeParams'];
	
	//will add a new quiz/deck to your page for quizing from recommended directive
	function addQuiz($rootScope, $scope, $location, deckService, $routeParams) {

		$scope.pullDeckAddQuiz = function(data) {
			console.log('Data',data)
			deckService.paused(data.id) 
		  }
		
		$scope.pullDeckAddQuiz(deckService.getID());
		
	}  


})();
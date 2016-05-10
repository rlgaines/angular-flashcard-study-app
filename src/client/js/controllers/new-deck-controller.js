(function(){
	'use strict';

	angular.module('myApp')
	  .controller('newDeckController', newDeckController);

	newDeckController.$inject = ['$rootScope', '$scope', '$location', 'newDeckService'];
	
	function newDeckController($rootScope, $scope, $location, newDeckService) {
		$scope.questions = [];
		$scope.cards = [];
		$scope.moreQuestions = function(){
			$scope.questions.push('')

		}
		$scope.submitDeck = function(data){
			return newDeckService.newDeck(data)
		}
		$scope.submitQuestions = function(data){
			return newDeckService.moreQuestions(data)
		}
	}  
})();
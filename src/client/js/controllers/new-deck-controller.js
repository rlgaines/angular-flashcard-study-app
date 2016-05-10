(function(){
	'use strict';

	angular.module('myApp')
	  .controller('newDeckController', newDeckController);

	newDeckController.$inject = ['$rootScope', '$scope', 'newDeckService'];
	
	function newDeckController($rootScope, $scope, newDeckService) {
		$scope.questions = [];
		$scope.cards = [];
		$scope.moreQuestions = function(){
			$scope.questions.push('hey')

		}
		$scope.submitDeck = function(data){
			console.log(data)
		}
		$scope.submitQuestions = function(data){
			console.log('Controller',data)
		}
	}  
})();
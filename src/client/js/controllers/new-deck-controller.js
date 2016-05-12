(function(){
	'use strict';

	angular.module('myApp')
	  .controller('newDeckController', newDeckController);

	newDeckController.$inject = ['$rootScope', '$scope', '$location', 'newDeckService', '$routeParams'];
	
	function newDeckController($rootScope, $scope, $location, newDeckService, $routeParams) {
		$scope.questions = [];
		$scope.cards = [];
		$scope.moreQuestions = function(){
			$scope.questions.push('')

		}
		$scope.submitDeck = function(data, cards){
			console.log(data, cards)
			var newArray = [];
			newArray.push(data, cards)
			return newDeckService.newDeck(newArray, $routeParams.id)
		}
		// $scope.submitQuestions = function(data){
		// 	return newDeckService.moreQuestions(data, $routeParams.id)
		// }
	}  
})();
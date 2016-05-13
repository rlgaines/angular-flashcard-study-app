(function(){
	'use strict';

	angular.module('myApp')
	  .controller('newDeckController', newDeckController);

	newDeckController.$inject = ['$rootScope', '$scope', '$location', 'newDeckService', '$routeParams'];
	
	//new deck creater
	function newDeckController($rootScope, $scope, $location, newDeckService, $routeParams) {
		$scope.questions = [];
		$scope.cards = [];
		$scope.moreQuestions = function(){
			$scope.questions.push('')

		}
		$scope.submitDeck = function(data, cards){
			console.log('PARAMS:', $routeParams)
			var newArray = [];
			newArray.push(data, cards)
			newDeckService.newDeck(newArray, $routeParams.id).then(function(data){
				console.log('success', data)
			})
		}
		
	}  
})();
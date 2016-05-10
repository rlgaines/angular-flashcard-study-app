(function(){
	'use strict';

	angular.module('myApp')
	  .controller('newDeckController', newDeckController);

	newDeckController.$inject = ['$rootScope', '$scope', 'newDeckService'];
	
	function newDeckController($rootScope, $scope, newDeckService) {
		$scope.questions = []
		$scope.moreQuestions = function(){
			$scope.questions.push('')
		}
	}  
})();
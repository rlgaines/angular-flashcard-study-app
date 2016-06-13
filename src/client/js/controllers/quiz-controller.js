(function() {
    'use strict';

    angular.module('myApp')
        .controller('quizController', quizController);

    quizController.$inject = ['$rootScope', '$scope', '$location', 'deckService', '$routeParams'];

    //will add a new quiz/deck to your page for quizing from recommended directive
    function quizController($rootScope, $scope, $location, deckService, $routeParams) {
        console.log($routeParams.id)
        $scope.pullDeckAddQuiz = function(data) {
            // console.log('Data',data)
            deckService.paused(data.id)
        }

        $scope.quiz = deckService.getSingleDeck($routeParams.id)
            .then(function(info) {
                // console.log(info)
                $scope.quiz = info.data
            });
    }


})();
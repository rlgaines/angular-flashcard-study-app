(function() {
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
            .then(function(data) {
                var notIncluded = [];
                var included = [];
                var names = [];

                //checks ID to split decks by ID
                function checkId(el) {
                    if (el.user_id != $scope.userId) {
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

    }
})();



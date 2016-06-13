(function() {
    'use strict'

    angular
        .module('myApp')
        .directive('recommendedQuizes', recommendedQuizes)

    function recommendedQuizes() {
        var directive = {
            restrict: 'EA',
            template: `    
                        <div class="container" id="recommended">  
                         <h3>Recommended Quizes:</h3>    
                          <div class="list-group" ng-repeat="info in notIncluded" ng-hide="info === deck">
                           <a href="#/{{info.id}}/add" ng-click="pullDeckAddQuiz(info)" class="list-group-item default">
                            <img ng-src="{{info.image}}">
                            <h3 class="list-group-item-heading">{{info.name}}</h3>
                             <p class="list-group-item-text">{{info.description}}</p>
                           </a>
                          </div> 
                        </div>`,
            controller: 'addQuiz',
            duplicate: '='

        }


        return directive;
    }


})();
(function(){
 'use strict'

 angular
   .module('myApp')
   .directive('recommendedQuizes', recommendedQuizes)

 function recommendedQuizes(){
   var directive = {
     restrict: 'EA',
     template: `    
  <div class="container" id="recommended">  
   <h3>Recommended Quizes:</h3>    
    <div class="list-group" ng-repeat="deck in notIncluded">
     <a href="#/{{deck.id}}/add" ng-click="pullDeck(deck)" class="list-group-item default">
      <img ng-src="{{deck.image}}">
      <h3 class="list-group-item-heading">{{deck.name}}</h3>
       <p class="list-group-item-text">{{deck.description}}</p>
     </a>
    </div> 
  </div>   
`,
     controller: 'deckController'

   }


   return directive;
 }

 
})();
(function(){
 'use strict'

 angular
   .module('myApp')
   .directive('navbarDir', navbarDir)

 function navbarDir(){
   var directive = {
     restrict: 'EA',
     template: `          
    <nav class="navbar navbar-default">
      <a href="#/{{userId}}/decks"><button type="button" class="btn btn-default navbar-btn">Home</button></a>
      <a href="#/logout"><button type="button" class="btn btn-default navbar-btn">Sign Out</button></a>

    </nav>   `,
     controller: 'deckController'
        }


   return directive;
 }

 
})();
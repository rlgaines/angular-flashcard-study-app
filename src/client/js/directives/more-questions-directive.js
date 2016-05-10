(function(){
 'use strict'

 angular
   .module('myApp')
   .directive('moreQuestions', moreQuestions)

 function moreQuestions(){
   var directive = {
     restrict: 'A',
     template: `          
     <div class="row"> 
     <br>
       <div class="col-md-6">
      <div class="input-group">
        <span class="input-group-addon" id="sizing-addon2">Question</span>
        <input type="text" class="form-control" placeholder="" aria-describedby="sizing-addon2">
      </div>
    </div> 
     <div class="col-md-6">
      <div class="input-group">
        <span class="input-group-addon" id="sizing-addon2">Answer</span>
        <input type="text" class="form-control" placeholder="" aria-describedby="sizing-addon2">
      </div>
    </div> 
   </div> `,
     replace: true,
     transclude: false,
     scope: {
        aCard: '=moreQuestions'
     }
   }


   return directive;
 }

 
})();
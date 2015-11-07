app.directive('stars', function() {
   return {
       restrict: "E",
       scope: {
           stars: '='
       },
       templateUrl: 'js/common/directives/stars/stars.html',
       link: function(scope) {
           scope.starArr = [];
           for(var i=0; i < scope.stars; i++) {
               scope.starArr.push(i);
           }
       }
   } 
});
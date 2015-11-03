app.controller('HomeCtrl', function($scope, $state) { 
  $scope.submit = function() {    
      $state.go('results', {animalName: $scope.animalName});
  }
});
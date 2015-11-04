app.controller('HomeCtrl', function($scope, $state, animals) { 
  $scope.animals = animals;
  $scope.submit = function() {    
      $state.go('results', {animalName: $scope.animalName});
  }
});
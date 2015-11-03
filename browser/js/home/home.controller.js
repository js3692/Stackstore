app.controller('HomeCtrl', function($scope, Animal, AnimalFactory) { 
  $scope.submit = function() {
    console.log("animal is", $scope.animalName);
    AnimalFactory.findByName($scope.animalName).then(function(animals) {
      console.log(animals);
    });
    //$state.go('Animal', {})
  }
});
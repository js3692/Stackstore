app.controller('AddAnimalCtrl', function($scope, Animal) {
    $scope.submit = function() {
        Animal.create($scope.animal);
    };
});
app.controller('AddAnimalCtrl', function($scope, Animal) {
    $scope.animal = {};
    
    $scope.submit = function() {
        Animal.create($scope.animal);
    };
    
    $scope.categories = [ 
                    'Near Threatened', 
                    'Vulnerable',
                    'Endangered',
                    'Critically Endangered',
                    'Extinct in the Wild',
                    'Extinct'];

    $scope.status = {
        isopen: false
    };
    
    $scope.currentStatusOrDefault = function(){
        if(!$scope.animal.conservationStatus) return "Set Conservation Status";
        else return $scope.animal.conservationStatus; 
    };
    
    $scope.chooseCategory = function(category){
        $scope.animal.conservationStatus = category;  
    };

});
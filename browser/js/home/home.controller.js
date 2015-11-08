app.controller('HomeCtrl', function($scope, $state, animals) { 
    $scope.animals = animals;
    
    
    $scope.categories = ['All', 
                    'Near Threatened', 
                    'Vulnerable',
                    'Endangered',
                    'Critically Endangered',
                    'Extinct in the Wild',
                    'Extinct'];

    $scope.status = {
        isopen: false
    };
    
    $scope.chooseCategory = function(category){
        if(category === 'All') delete $scope.category;
        else $scope.category = category;  
    };

    $scope.toggleDropdown = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.status.isopen = !$scope.status.isopen;
    };
});
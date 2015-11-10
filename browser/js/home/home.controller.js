app.controller('HomeCtrl', function($scope, $state, $sce, animals) {
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

});
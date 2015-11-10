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

    $scope.label = 'All';
    
    $scope.chooseCategory = function (category) {
        if(category === 'All') {
            delete $scope.category;
            $scope.label = 'All';
        } else {
            $scope.category = category;
            $scope.label = category;
        }
    };

});
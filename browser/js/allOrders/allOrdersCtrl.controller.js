app.controller('AllOrdersCtrl', function($scope, orders, users){
    $scope.orders = orders;
    $scope.users = users;

    $scope.categories = [
        'All',
        'Created',
        'Processing',
        'Cancelled',
        'Completed'
    ];

    $scope.status = {
        isopen: false
    };

    $scope.chooseCategory = function(category){
        if(category === 'All') delete $scope.category;
        else $scope.category = category;
    };

// what's this for?
    $scope.toggleDropdown = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.status.isopen = !$scope.status.isopen;
    };
});

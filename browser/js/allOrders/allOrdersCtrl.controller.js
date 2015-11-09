app.controller('AllOrdersCtrl', function($scope, orders, users, $log){
    $scope.orders = setStatusOptions(orders);
    $scope.users = users;
    
    function setStatusOptions(orders){
        var orderTransitionOptions = {
            created: ['Processing'],
            processing: ['Cancelled', 'Completed']
        }
        
        orders.forEach(function(order) {
            order.options = orderTransitionOptions[order.status.toLowerCase()];
        });
        return orders;
    }
    
    $scope.Ordercategories = [
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
    
});
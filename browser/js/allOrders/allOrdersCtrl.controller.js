app.controller('AllOrdersCtrl', function($scope, orders, users){
    $scope.orders = setStatusOptions(orders);
    $scope.users = users;
    
    function setStatusOptions(orders){
        var orderTransitionOptions = {
            created: ['Processing'],
            processing: ['Cancelled', 'Completed']
        }
        console.log('this is ordersssss', orders)
        orders.forEach(function(order) {
            order.statusOptions = orderTransitionOptions[order.status.toLowerCase()];
        });
        return orders;
    }
    
    $scope.changeOrderStatus = function(order, status) {
        order.DSUpdate({ status: status })
            .then(function() {
                $scope.orders = setStatusOptions(orders);
            });
    };
    
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
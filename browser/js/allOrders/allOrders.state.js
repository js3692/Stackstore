app.config(function($stateProvider){
    $stateProvider.state('adminDashboard.allOrders',{
        url:'allOrders',
        templateUrl: 'js/allOrders/allOrders.html',
        resolve: {
            orders: function(Order){
                return Order.findAll();
            },
            users: function(User){
                return User.findAll();
            }
        },
        controller: 'AllOrdersCtrl'
    })
});
app.config(function($stateProvider){
    $stateProvider.state('myOrders',{
        url:  '/myOrders',
        templateUrl: 'js/myOrders/myOrders.html',
        resolve: {
            orders: function(AuthService, Order) {
                return AuthService.getLoggedInUser()
                    .then(function(user){
                        return Order.byUser(user._id);
                    });
            }  
        },
        controller: 'MyOrdersCtrl'
    });
});
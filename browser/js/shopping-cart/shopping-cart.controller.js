app.controller('ShoppingCartCtrl', function($scope, $state, cart, Cart) {
    $scope.cart = cart;

    $scope.deleteOne = function (itemId) {
        Cart.delete(itemId)
            .then(function (updatedCart) {
                $scope.cart = updatedCart;
            });
    };
    
    $scope.getTotal = function() {

    };
    
    $scope.getSubtotal = function (quantity, price) {
        return (quantity * price).toFixed(2);
    };
    
    $scope.purchase = function () {
        // If not logged in direct to log in page

        Cart.purchase({ shipTo: $scope.shippingAddress })
            .then(function (emptyCart) {
                $scope.cart = emptyCart;
                $state.transitionTo('home', {}, { location: true, notify: true, reload: true });
            });
    };
    
});
app.controller('ShoppingCartCtrl', function($scope, $state, cart, Cart, DS, AuthService) {
    $scope.cart = cart;
    $scope.Auth = AuthService.isAuthenticated();


    $scope.deleteOne = function (itemId) {
        Cart.delete(itemId)
            .then(function (updatedCart) {
                $scope.cart = updatedCart;
            });
    };
    
    $scope.getTotal = function() {
        return $scope.cart.reduce(function(total, animal) {
            total += Number(animal.quantity)*Number(animal.priceUSD);
            return total;
        }, 0);
    };
    
    $scope.getSubtotal = function (quantity, price) {
        return (quantity * price).toFixed(2);
    };
    
    $scope.purchase = function () {
        console.log("email address is", $scope.email)
        Cart.purchase({ shipTo: $scope.shippingAddress, guestEmail: $scope.email })
        .then(function (emptyCart) {
            $scope.cart = emptyCart;
            DS.ejectAll('animals');
            $state.transitionTo('home', {}, { location: true, notify: true, reload: true });
        });        
    };
    
});
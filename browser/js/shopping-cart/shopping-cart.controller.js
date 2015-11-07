app.controller('ShoppingCartCtrl', function($scope, cart, animals, Cart) {
    $scope.cart = Cart.matchToAnimals(animals, cart.data.items);
});
app.controller('ShoppingCartCtrl', function($scope, cart, Cart, animals) {
    console.log(animals)
    $scope.cart = Cart.matchToAnimals(animals, cart.data.items);
});
app.controller('ShoppingCartCtrl', function($scope, cart, Cart, animals) {
    $scope.cart = Cart.matchToAnimals(animals, cart.data.items);
    
    $scope.deleteOne = function(animalToDelete) {
        $scope.cart = $scope.cart.filter(function(animal) {
             return animal._id !== animalToDelete._id;
        });
        cart.data.items = cart.data.items.filter(function(item) {
            return item.animal !== animalToDelete._id;
        });
        Cart.update(cart);
    };
    
    $scope.getTotal = function() {  
    };
    
    $scope.getSubtotal = function(quantity, price) {
        return Number(quantity) * Number(price);  
    };
    
    $scope.purchase = function() {
        cart.data.shippingAddr = $scope.shippingAddress;
        Cart.purchase(cart);
    };
    
});
app.controller('AnimalCtrl', function($scope, Review, Cart, animal, cart, Session, AuthService) {
    
    $scope.animal = animal;
    $scope.submit = function() {
        $scope.review.author = Session.user._id;
        $scope.review.animal = animal._id;
        Review.create($scope.review);
        $scope.review = {};
    };

    
    $scope.centerPanel = [
        { label: "Conservation Status:", value: animal.conservationStatus },
        { label: "Price:", value: "$" + animal.priceUSD }, 
        { label: "Left in stock:", value: animal.inventoryQuantity }
    ];
    
    $scope.addToCart = function() {
        console.log(cart, 'here is the cart');  
        cart.data.items.push($scope.animal._id);
        Cart.update(cart)
            .then(function(updatedCart) {
                cart = updatedCart;
            });
//        Cart.addItem($scope.animal)
//            .then(function(cart) {
//                console.log(cart);
//            }, function(err) {
//                console.log(err);
//            });
    };
    
    $scope.isLoggedIn = function () {
        return AuthService.isAuthenticated();
    };
    
    
    //for star ratings.
    $scope.rate = 0;
    $scope.max = 5;
    $scope.isReadonly = false;

    $scope.hoveringOver = function(value) {
        $scope.overStar = value;
        $scope.percent = 100 * (value / $scope.max);
    };

});
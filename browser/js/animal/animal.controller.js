app.controller('AnimalCtrl', function($scope, Review, Cart, animal, cart, Session, AuthService) {
    
    $scope.aggregateStars = function(reviews){
        var totalReviewsWithStars = 0;
        var starTotal = reviews.reduce(function(sum, review) {
            if(review.stars) {
                sum+=review.stars;
                totalReviewsWithStars++;
            }
            return sum;
        }, 0);
        return Math.ceil(starTotal/totalReviewsWithStars);
    };
    
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
        var cartItem = {
            animal: $scope.animal._id,
            quantity: $scope.animalQuantity
        }
        cart.data.items.push(cartItem);
        Cart.update(cart)
            .then(function(updatedCart) {
                cart = updatedCart;
            });
    };
    
    $scope.isLoggedIn = function () {
        return AuthService.isAuthenticated();
    };
    
    
    //for animal quantity picker
    // $scope.animalQuantity = 1;

    $scope.options = {
        astep: _.fill(Array(animal.inventoryQuantity), 0).map(function (elem, idx) { return idx + 1; })
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
app.controller('AnimalCtrl', function($scope, Review, Cart, animal, cart, Session, AuthService) {
    
    $scope.aggregateStars = function (reviews) {
        if (reviews) {
            var totalReviewsWithStars = 0;
            var starTotal = reviews.reduce(function(sum, review) {
                if(review.stars) {
                    sum+=review.stars;
                    totalReviewsWithStars++;
                }
                return sum;
            }, 0);
            return Math.ceil(starTotal/totalReviewsWithStars);
        } else return 0;
    };
    
    $scope.animal = animal;

    $scope.submit = function() {
        $scope.review.author = Session.user._id;
        $scope.review.animal = animal._id;
        Review.create($scope.review);
        $scope.review = {};
    };

    $scope.animalQuantity = 0;
    
    $scope.changeQuantity = function (quantity) {
        $scope.animalQuantity += quantity;
    };

    $scope.isMin = function () {
        return $scope.animalQuantity === 0;
    };

    $scope.isMax = function () {
        return $scope.animalQuantity === $scope.animal.inventoryQuantity;
    };

    $scope.addToCart = function() {
        Cart.update({
            animal: $scope.animal._id,
            quantity: $scope.animalQuantity
        })
        .then(function (animal) {
            $scope.animal = animal;
            $scope.animalQuantity = 0;
        });
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
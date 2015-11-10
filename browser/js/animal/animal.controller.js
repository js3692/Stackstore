app.controller('AnimalCtrl', function($scope, Review, Cart, animal, cart, Session, AuthService, recommendations) {
    
    $scope.animal = animal;
    
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
    console.log($scope)
//    $scope.review = {};
    $scope.submit = function() {
        if($scope.review.content.length < 20) {
            addAlert();
            return;
        }
        $scope.closeAlert();
        $scope.review.author = Session.user._id;
        $scope.review.animal = animal._id;
        Review.create($scope.review);
//        $scope.review = {};
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
    
    //review form alerts
    $scope.alerts = [];

    function addAlert() {
        if($scope.alerts.length > 0) return;
        $scope.alerts.push({msg: 'Reviews must be 20 characters long.'});
    }

    $scope.closeAlert = function() {
        $scope.alerts.pop();
    };
    
    //recommendations
    
    
    
    $scope.myInterval = 5000;
    
    
    function formatRecommendations(recommendations){
        if(Array.isArray(recommendations)) return recommendations;    
        else return [recommendations];
    }
    
    $scope.recommendations = formatRecommendations(recommendations);
    

});
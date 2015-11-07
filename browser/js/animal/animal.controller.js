app.controller('AnimalCtrl', function($scope, Review, Cart, animal, Session, AuthService) {
    
    $scope.animal = animal;
    $scope.submit = function() {
        $scope.review.author = Session.user._id;
        $scope.review.animal = animal._id;
        Review.create($scope.review);
        $scope.review = {};
    };

    $scope.stars = [1,2,3,4,5];
    
    $scope.centerPanel = [
        { label: "Conservation Status:", value: animal.conservationStatus },
        { label: "Price:", value: "$" + animal.price }, 
        { label: "Left in stock:", value: animal.inventoryQuantity }
    ];
    
    $scope.addToCart = function() {
        Cart.addItem($scope.animal)
            .then(function(cart) {
                console.log(cart);
            }, function(err) {
                console.log(err);
            });
    };
    
    $scope.isLoggedIn = function () {
        return AuthService.isAuthenticated();
    };
    
    $scope.rate = 0;
    $scope.max = 5;
    $scope.isReadonly = false;

    $scope.hoveringOver = function(value) {
        $scope.overStar = value;
        $scope.percent = 100 * (value / $scope.max);
    };

//    $scope.ratingStates = [
//        {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
//        {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
//        {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
//        {stateOn: 'glyphicon-heart'},
//        {stateOff: 'glyphicon-off'}
//    ];

//    $scope.removeFromCart = function() {
//        
//    };
});
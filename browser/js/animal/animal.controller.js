app.controller('AnimalCtrl', function($scope, Review, Cart, animal, Session) {
    Cart.sayHello();
    $scope.animal = animal;
    $scope.submit = function() {
        $scope.review.author = Session.user._id;
        $scope.review.animal = animal._id;
        Review.create($scope.review);
    };
    
//    $scope.addToCart = function() {
//        
//    };
//    $scope.removeFromCart = function() {
//        
//    };
})
app.controller('AnimalCtrl', function($scope, animal, users, reviews) {
    console.log('here are the reviews!', reviews);
    $scope.reviews = reviews;
    $scope.users = users;
    $scope.animal = animal;
})
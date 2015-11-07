app.controller('AllOrdersCtrl', function($scope, orders, users){
    $scope.orders = orders;
    $scope.users = users;
    console.log(users);
    
});
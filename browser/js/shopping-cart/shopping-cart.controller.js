app.controller('ShoppingCartCtrl', function($scope, ShoppingCartFactory, cart) {
  $scope.deleteOne = ShoppingCartFactory.deleteOne;
  $scope.cart = cart;
//  $scope.submit = function() {}
})
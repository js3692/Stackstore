app.controller('MyOrdersCtrl', function ($scope, orders, Order) {
	$scope.orders = orders;
	$scope.getSubtotal = Order.getSubtotal;
	$scope.getTotal = Order.getTotal;
});
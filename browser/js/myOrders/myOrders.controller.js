app.controller('MyOrdersCtrl', function ($scope, orders, Order) {
	//newest orders listed first.
	orders.reverse();


	$scope.orders = orders;
	$scope.getSubtotal = Order.getSubtotal;
	$scope.getTotal = Order.getTotal;
});
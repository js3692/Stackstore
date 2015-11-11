app.controller('AllOrdersCtrl', function ($scope, orders, users, Order, DS) {
	//newest orders listed first.
	orders.reverse();

	var orderTransitionOptions = {
		created: ['Processing'],
		processing: ['Cancelled', 'Completed']
	};

	$scope.orders = setStatusOptions(orders);
	$scope.users = users;

	function setStatusOptions(orders) {

		orders.forEach(function (order) {
			order.statusOptions = orderTransitionOptions[order.status.toLowerCase()];
		});
		return orders;
	}

	$scope.changeOrderStatus = function (order, status) {
		order.DSUpdate({
				status: status
			})
			.then(function () {
				order.statusOptions = orderTransitionOptions[status.toLowerCase()];
				DS.ejectAll('order')
			});
	};

	$scope.Ordercategories = [
        'All',
        'Created',
        'Processing',
        'Cancelled',
        'Completed'
    ];

	$scope.status = {
		isopen: false
	};

	$scope.label = 'All';

	$scope.chooseCategory = function (category) {
		if (category === 'All') {
			delete $scope.category;
			$scope.label = 'All';
		} else {
			$scope.category = category;
			$scope.label = category;
		}
	};

	$scope.getSubtotal = Order.getSubtotal;
	$scope.getTotal = Order.getTotal;

});
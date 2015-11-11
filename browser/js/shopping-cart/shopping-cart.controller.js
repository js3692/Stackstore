app.controller('ShoppingCartCtrl', function ($scope, $state, cart, Cart, DS, AuthService, ItemFactory) {
	$scope.cart = cart;
	$scope.Auth = AuthService.isAuthenticated();


	$scope.deleteOne = function (itemId) {
		Cart.delete(itemId)
			.then(function (updatedCart) {
				DS.ejectAll('cart');
				DS.ejectAll('animals');
				$scope.cart = updatedCart;
			});
	};

	$scope.getTotal = function () {
		return $scope.cart.items.reduce(function (total, item) {
			total += Number(item.quantity) * Number(item.animal.priceUSD);
			return total;
		}, 0).toFixed(2);
	};

	$scope.getSubtotal = function (quantity, price) {
		return (quantity * price).toFixed(2);
	};

	$scope.purchase = function () {
		Cart.purchase({
				shipTo: $scope.shippingAddress,
				guestEmail: $scope.email
			})
			.then(function (emptyCart) {
				$scope.cart = emptyCart;
				DS.ejectAll('animals');
				DS.ejectAll('order');
				$state.go('home');
			});
	};

	$scope.changeQuantity = function (item, quantity) {
		if (item.quantity === 1 && quantity === -1) $scope.deleteOne(item._id);
		else {
			ItemFactory.updateItemQuantity(item, quantity)
				.then(function (updatedItem) {
					item.quantity = updatedItem.quantity;
					DS.ejectAll('animals');
				})
		}
	};

	$scope.isMin = function (item) {
		return item.quantity === 0;
	};

	$scope.isMax = function (item) {
		return item.quantity === item.animal.inventoryQuantity;
	};

});
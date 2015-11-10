app.factory('Order', function (DS) {
	var Order = DS.defineResource({
		name: 'order',
		relations: {
			hasOne: {
				users: {
					localField: 'orderedBy',
					localKey: 'user'
				}
			}
		}
	});

	Order.getSubtotal = function (quantity, price) {
		return (quantity * price).toFixed(2);
	};

	Order.getTotal = function (items) {
		return items.reduce(function (total, item) {
			total += Number(item.quantity) * Number(item.animal.priceUSD);
			return total;
		}, 0);
	};

	Order.byUser = function (id) {
		return this.findAll()
			.then(function (orders) {
				return orders.filter(function (order) {
					return id === order.user;
				});
			});
	};
	return Order;

}).run(function (Order) {});
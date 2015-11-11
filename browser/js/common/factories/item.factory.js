app.factory('ItemFactory', function ($http) {
	var baseUrl = '/api/items/';

	function toData(response) {
		return response.data;
	}
	return {
		updateItemQuantity: function (item, quantity) {
			return $http.put(baseUrl + item._id, {
				quantity: quantity
			}).then(toData);
		}

		//		updateItemQuantity: function (item, quantity) {
		//			var PromiseForAnimalUpdate = Animal.update(item.animal._id, {
		//				inventoryQuantity: item.animal.inventoryQuantity - quantity
		//			});
		//
		//			var PromiseForItemUpdate = $http.put(baseUrl + item._id, {
		//				quantity: quantity
		//			});
		//
		//			return Promise.all([PromiseForAnimalUpdate, PromiseForItemUpdate])
		//				.then(function (promises) {
		//					return {
		//						animal: promises[0],
		//						item: promises[1]
		//					}
		//				})
		//		}
	};
});
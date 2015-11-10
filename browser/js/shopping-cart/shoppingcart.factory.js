app.factory('Cart', function(DS, $state, $http) {
    
    var baseUrl = '/api/cart/me/';
    
    function toData(response) {
        return response.data;
    }

	var Cart = DS.defineResource({
        name: 'cart',
        actions: {
            me: {
                method: 'GET',
                isArray: false
            }
        },
        relations: {
            hasOne: {
                user: {
                    localField: 'user',
                    foreignKey: 'user'
                }
            }
        }
    });
    
    Cart.update = function(cartItem) {
        return $http.put(baseUrl, cartItem).then(toData);
    };

    Cart.delete = function(cartItemId) {
        return $http.delete(baseUrl + cartItemId).then(toData);
    };
    
    Cart.purchase = function (address) {
        return $http.post('/api/order', address).then(toData);
    };
    
	return Cart;
}).run(function (Cart) {});
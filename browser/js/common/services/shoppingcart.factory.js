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
    
    Cart.addItem = function(item) {
        console.log('inside the cart!');
        return $http.put(baseUrl, item)
            .then(toData);
    };
    

	return Cart;
}).run(function (Cart) {})
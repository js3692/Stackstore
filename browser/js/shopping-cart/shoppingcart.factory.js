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
    
    Cart.update = function(cart) {
        return $http.put(baseUrl, cart.data)
            .then(toData);
    };
    
    Cart.matchToAnimals = function(animals, cart) {
        var matchedCart = cart.map(function(item) {
            var matched = animals.reduce(function(match, animal) {
                if(animal._id === item.animal) {
                    animal.quantity = item.quantity;
                    return animal;
                }
                else return match;
            },{});
            return matched; 
        });    
        return matchedCart;
    };
    
    
	return Cart;
}).run(function (Cart) {})
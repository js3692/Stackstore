app.factory('Cart', function(DS, $state, $http) {
    // why isn't this file kabob case?

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
                    foreignKey: 'user' // that's not what that does I don't think
                }
            }
        },
        methods: {
            cartUpdate: function() {
                return this.update(this.data)
                    .then(toData)
            }
        }
    });

    Cart.update = function(cart) {
        // methodsssss
        return $http.put(baseUrl, cart.data)
            .then(toData);
    };

    Cart.matchToAnimals = function(animals, cart) {
        // I'm confuzed
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
[{animal: idthing, quantity:17}]
[{name:'Bill Murray', quantity:17}]
cart = animals.filter(function(animal) {
    var cartItem = _.find(cart, function(item) {
        return item._id === animal._id;
    })
    if (!cartItem) return false;
    animal.quantity = cartItem.quantity;
    return true;
})


	return Cart;
}).run(function (Cart) {})

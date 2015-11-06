app.factory('Cart', function(DS, $state) {

	var Cart = DS.defineResource({
	    name: 'cart/me',
        relations: {
            hasOne: {
                user: {
                    localField: 'user',
                    foreignKey: 'user'
                }
            }
        }
    })

	return Cart;
}).run(function (Cart) {})
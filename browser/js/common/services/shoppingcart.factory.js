app.factory('Cart', function(DS, $state) {

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

	return Cart;
}).run(function (Cart) {})
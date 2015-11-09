app.factory('Order', function(DS) {
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
    Order.byUser = function(id) {
        return this.findAll()
            .then(function(orders) {
                return orders.filter(function(order) {
                    return id === order.user;
                });
            });
    };
    return Order;
    
}).run(function(Order) {});
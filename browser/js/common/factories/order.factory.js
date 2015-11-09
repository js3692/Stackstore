app.factory('Order', function(DS) {
    var Order = DS.defineResource({
        name: 'order'
    });
    Order.byUser = function(id) {
        console.log(id);
        this.find('me', {isArray:true}) // /api/order/me


        return this.findAll()
            .then(function(orders) { // maybe filter on the server
                return orders.filter(function(order) {
                    return id === order.user;
                });
            });

    };
    return Order;

}).run(function(Order) {});

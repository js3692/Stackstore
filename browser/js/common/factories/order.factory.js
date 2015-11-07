app.factory('Order', function(DS) {
    var Order = DS.defineResource({
        name: 'order'
    }); 
    return Order;
}).run(function(Order) {});
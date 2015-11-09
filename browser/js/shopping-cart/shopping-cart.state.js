app.config(function ($stateProvider) {
    $stateProvider.state('shoppingCart', {
        url: '/shoppingCart',
        templateUrl: 'js/shopping-cart/shopping-cart.html',
        resolve: {
            cart: function($stateParams, Cart) {
                return Cart.me().then(function (res) { return res.data; });
            },
            animals: function(Animal) {
                return Animal.findAll();
            }
        },
        controller: "ShoppingCartCtrl"
    });
});

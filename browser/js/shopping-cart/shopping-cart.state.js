app.config(function ($stateProvider) {
    $stateProvider.state('shoppingCart', {
        url: '/shoppingCart',
        templateUrl: 'js/shopping-cart/shopping-cart.html',
        resolve: {
          cart: function($stateParams, Cart) {
            return Cart.me();
          }
        },
        controller: "ShoppingCartCtrl"
    });
});

app.config(function ($stateProvider) {
    $stateProvider.state('shoppingCart', {
        url: '/shoppingCart',
        templateUrl: 'js/shopping-cart/shopping-cart.html',
        resolve: {
          cart: function($stateParams, ShoppingCartFactory) {
            return ShoppingCartFactory.get();
          }
        },
        controller: "ShoppingCartCtrl"
    });
});

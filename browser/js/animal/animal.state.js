app.config(function ($stateProvider) {
    $stateProvider.state('animal', {
        url: '/animal/:id',
        templateUrl: 'js/animal/animal.html',
        resolve: {
          animal: function(AnimalFactory, $stateParams) {
            return AnimalFactory.findById($stateParams.id);
          }
        },
        controller: "AnimalCtrl"
    })
});

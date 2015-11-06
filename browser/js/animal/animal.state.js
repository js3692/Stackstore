app.config(function ($stateProvider) {
    $stateProvider.state('animal', {
        url: '/animal/:id',
        templateUrl: 'js/animal/animal.html',
        resolve: {
            animal: function(Animal, $stateParams) {
                return Animal.find($stateParams.id);
            }
        },
        controller: "AnimalCtrl"
    })
});

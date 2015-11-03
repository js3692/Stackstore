app.config(function ($stateProvider) {
    $stateProvider.state('results', {
        url: '/results',
        templateUrl: 'js/results/results.html',
        resolve: {
          animals: function(AnimalFactory, $stateParams) {
            return AnimalFactory.findByName($stateParams.animalName);
          }
        },
        controller: 'ResultsCtrl'
    });
});

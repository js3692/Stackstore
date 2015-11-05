app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        resolve: {
          animals: function(AnimalFactory, $stateParams) {
            return AnimalFactory.findAll($stateParams.animalName);
          }
        },
        controller: 'HomeCtrl'
    });
});
app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        resolve: {
          animals: function(Animal) {
            return Animal.findAll();
          }
        },
        controller: 'HomeCtrl'
    });
});
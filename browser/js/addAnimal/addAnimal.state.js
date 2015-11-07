app.config(function($stateProvider) {
    $stateProvider.state('adminDashboard.addAnimal', {
        url:'/addAnimal',
        templateUrl: 'js/addAnimal/addAnimal.html',
        controller: "AddAnimalCtrl"
    }); 
});
app.config(function($stateProvider) {
    $stateProvider.state('addAnimal', {
        url:'/addAnimal',
        templateUrl: 'js/addAnimal/addAnimal.html',
        controller: "AddAnimalCtrl"
    }); 
});
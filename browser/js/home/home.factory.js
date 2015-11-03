app.factory('Animal', function($http, DS) {
  var Animal = DS.defineResources({
    name: 'animals'
  });
  
  return Animal;
}).run(function(Animal) {});

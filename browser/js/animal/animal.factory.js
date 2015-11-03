app.factory('AnimalFactory', function($http) {
  var baseUrl = '/api/animals';
  
  return {
    findByName: function(name) {      
      return $http.get(baseUrl, { name: name });
    }, 
    findById: function(id) {
      return $http.get(baseUrl + id);
    }
  };
});
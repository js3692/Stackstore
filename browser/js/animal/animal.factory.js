app.factory('AnimalFactory', function($http) {
  var baseUrl = '/api/animals/';
  
  function toData(response) {
    return response.data; 
  }
  
  return {
    findByName: function(name) {      
      return $http.get(baseUrl, { name: name })
        .then(toData);
    }, 
    findById: function(id) {
      return $http.get(baseUrl + id)
        .then(toData);
    }
  };
});
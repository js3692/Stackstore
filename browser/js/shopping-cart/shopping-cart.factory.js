app.factory("ShoppingCartFactory", function($http) {
  var baseUrl = '/api/cart/';
  function toData(response) {
    return response.data;
  }
  
  var shoppingCart = {
    get: function() {
      return $http.get(baseUrl).then(toData);
    },
    put: function(id) {
      return $http.put(baseUrl + id + "/add", { id: id}).then(toData);
    },
    deleteOne: function(id) {
      return $http.put(baseUrl + id + "/delete", { id: id}).then(toData);
    },
    delete: function() {
      return $http.delete(baseUrl).then(toData);
    }
  }
  
  return shoppingCart;
});
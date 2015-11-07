app.factory('User', function(DS, $http) {
    var baseUrl = '/api/users/';
    function toData (response) {
        return response.data;
    }
    
	var User = DS.defineResource({
        name: 'users',
        relations: {
            hasMany: {
                order: {
                    localField: 'userOrders',
                    foreignKey: 'user'
                }
            } 
        }
    });
    
    User.promote = function(id) {
        return $http.post(baseUrl + id + '/admin')
            .then(toData);
    };
    
	return User;
}).run(function (User) {});
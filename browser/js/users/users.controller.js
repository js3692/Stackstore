app.controller('UsersCtrl', function($scope, User, users) {
    $scope.users = users;
    $scope.promoteToAdmin = function(id) {
        User.promote(id);
    };
    
    $scope.deleteUser = function(id) {
        User.destroy(id);
    };
    
    $scope.triggerReset = function(id) {
        User.triggerReset(id);  
    };
});
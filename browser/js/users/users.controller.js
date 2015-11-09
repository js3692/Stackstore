app.controller('UsersCtrl', function($scope, User, users) {
    $scope.users = users;
    
    $scope.promoteToAdmin = User.promote;
    
    $scope.deleteUser = User.destroy;
    
    $scope.triggerReset = User.triggerReset;
});
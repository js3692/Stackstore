app.controller('ResetPasswordCtrl', function($scope, User, user, $state){
    $scope.reset = function(){
        User.reset(user._id, { password: $scope.newPassword })
            .then(function() {
                $state.go('home');
            });
    };
});
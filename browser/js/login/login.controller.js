app.controller('LoginCtrl', function ($scope, AuthService, $state) {

    $scope.user = {};
    $scope.error = null;

    $scope.sendLogin = function (loginInfo) {
        $scope.error = null;
        AuthService.login(loginInfo).then(function (user) {
            if(user.reset) $state.go('resetPassword');
            else $state.go('home');
        }).catch(function () {
            $scope.error = 'Invalid login credentials.';
        });
    };
});
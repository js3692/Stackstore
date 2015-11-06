app.controller('SignupCtrl', function ($scope, AuthService, $state) {

    $scope.user = {};
    $scope.error = null;

    $scope.sendSignup = function (signupInfo) {
        $scope.error = null;
        AuthService.signup(signupInfo).then(function() {
            $state.go('home'); //can make success page
        }).catch(function () {
            $scope.error = 'Invalid signup credentials.';
        });
    };

});


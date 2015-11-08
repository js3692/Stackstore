app.config(function($stateProvider){
    $stateProvider.state('resetPassword',{
        url:'/resetPassword',
        templateUrl:'js/resetPassword/resetPassword.html',
        resolve: {
            user: function(AuthService){
                return AuthService.getLoggedInUser();
            }  
        },
        controller:'ResetPasswordCtrl'
    });
});
app.config(function ($stateProvider) {
    $stateProvider.state('user', {
        url: '/user/:id',
        templateUrl: 'js/user/user.html',
        resolve: {
            user: function(User, $stateParams) {
                return User.find($stateParams.id);
            }
        }
        // controller: "UserCtrl"
    })
});

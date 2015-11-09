app.config(function($stateProvider) {
    $stateProvider.state('adminDashboard.users', {
        url:'/users',
        templateUrl: 'js/users/users.html',
        controller: 'UsersCtrl',
        resolve: {
            users: function(User) {
                return User.findAll();
            }
        }
    });
});
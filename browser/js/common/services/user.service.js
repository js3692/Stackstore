'use strict';

app.factory('User', function(DS, $state) {

	var User = DS.defineResource({
    name: 'user'
})

	return User;
}).run(function (User) {})
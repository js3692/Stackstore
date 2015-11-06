'use strict';

app.factory('Animal', function(DS, $state) {

	var Animal = DS.defineResource({
	    name: 'animal'
})

	return Animal;
}).run(function (Animal) {})
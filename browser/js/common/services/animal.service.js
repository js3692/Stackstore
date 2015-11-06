'use strict';
////
app.factory('Animal', function(DS, $state) {

	var Animal = DS.defineResource({
	    name: 'animals',
        relations: {
            hasMany: {
                reviews: {
                    localField: 'reviews',
                    foreignKey: 'animal'
                }
            }
        }
    })

	return Animal;
}).run(function (Animal) {})
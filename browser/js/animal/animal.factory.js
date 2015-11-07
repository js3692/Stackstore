app.factory('Animal', function(DS) {

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
    });

	return Animal;
}).run(function (Animal) {})
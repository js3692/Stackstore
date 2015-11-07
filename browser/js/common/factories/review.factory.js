app.factory('Review', function(DS, $state) {
    var Review = DS.defineResource({
        name: 'reviews',
        relations: {
            belongsTo: {
                users: {
                    localField: 'writtenBy', 
                    localKey: 'author'
                }
            }
        }
    });
    return Review;
}).run(function(Review) {});
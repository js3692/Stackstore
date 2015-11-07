app.factory('Recommendation', function(DS) {
    var Recommendation = DS.defineResource({
        name: 'recommendations'
    });
    return Recommendation;
}).run(function(Recommendation) {});
var mongoose = require('mongoose');
var Animal = mongoose.model('Animal');
var Order = mongoose.model('Order');
mongoose.Promise = require('bluebird');


/*
transforms orders into an array of animal id arrays.
*/
function transformOrdersToData (orders) {
    var data = orders.map(function(order) {
        return order.items.map(function(item) {
            return item.animal._id;
       }); 
    });
    return data;
}

//because indexOf will not work for an array of mongo ._ids.
function containsId(array, id) {
    for(var i = 0; i < array.length; i++) {
        if(array[i].equals(id)) return true;       
    }
    return false;
}

/*
given itemToMatch (an object id), returns hash. 
hash keys are object ids, 
the corresponding values are number of times those object ids 
appeared in orders with itemToMatch.
*/

function generateRecHash (data, itemToMatch) {
    var recHash = data.reduce(function(recHash, order) {
        if(!containsId(order, itemToMatch)) return recHash;
        order.forEach(function(item) {
            if(item.equals(itemToMatch)) return;
            recHash[item] ? recHash[item]++ : recHash[item] = 1;
       });
       return recHash;
    }, {});
    
    
    return recHash;
}

/*
returns top three highest values in recHash.
*/

function topThreeRecs (recHash) {
    
    var recArray = [];
    
    for(var item in recHash) {
        recArray.push([item, recHash[item]]);
    }
    
    var sorted = recArray.sort(function(a,b) {
        return a[1] - b[1];
    }).reverse();
    
    var out = [];
    for(var i = 0; i < 3; i++) {
        if(sorted[i]) out.push(sorted[i][0]);
    }
    
    return out;
}

module.exports = function(itemToMatch) {
    return Order.find({})
        .populate('items')     
        .then(function(orders) {
            var data = transformOrdersToData(orders);
            var hash = generateRecHash(data, itemToMatch);
            var topThree = topThreeRecs(hash);
            return Animal.find({})
                .where('_id')
                .in(topThree);
        });
};


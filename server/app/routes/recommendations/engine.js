//'use strict';
//var router = require('express').Router();
//module.exports = router;
////var _ = require('lodash');
//var mongoose = require('mongoose');
//mongoose.Promise = require('bluebird');
//require('../../../db/models');
//var Order = mongoose.model('Order');
//var Animal = mongoose.model('Animal');



/*
transforms orders into an array of animal id arrays.
*/
function transformOrdersToData (orders) {
    return orders.map(function(order) {
        return order.map(function(animal) {
            return animal._id;
       }); 
    });
}


/*
given itemToMatch (an object id), returns hash. 
hash keys are object ids, 
the corresponding values are number of times those object ids 
appeared in orders with itemToMatch.
*/

function generateRecHash (data, itemToMatch) {
    var recHash = data.reduce(function(recHash, order) {
        if(order.indexOf(itemToMatch) === -1) return recHash;
        order.forEach(function(item) {
            if(item === itemToMatch) return;
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

module.exports = function(orders, itemToMatch) {
    var data = transformOrdersToData(orders);
    var hash = generateRecHash(data, itemToMatch);
    return topThreeRecs(hash);
};


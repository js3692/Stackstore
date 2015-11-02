'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId
    },
    items: {
        type: [Schema.Types.ObjectId]
    }
});

mongoose.model('Cart', schema);
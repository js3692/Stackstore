'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    language: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Language'
    },
    code: {
        type: String
    },
    description: {
        // Description of product
        type: String
    },
    review: {
        // Reference to a review
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Review'
    }
});

mongoose.model('Product', schema);
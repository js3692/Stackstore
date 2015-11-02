'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    language: {
        type: mongoose.Schema.Types.ObjectId
    },
    code: {
        type: String
    },
    rating: {
        // A number (rounded to tenth digit) between 1 and 5
        type: Number
    },
    description: {
        // Description of product
        type: String
    },
    review: {
        // Reference to a review
        type: mongoose.Schema.Types.ObjectId
    }
});

mongoose.model('Product', schema);
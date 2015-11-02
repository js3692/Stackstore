'use strict';
var mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    stars: {
        type: Number,
        min: 0,
        max: 5,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }
});

mongoose.model('Review', reviewSchema);
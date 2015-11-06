'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    animal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Animal',
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    stars: {
        type: Number,
        min: 0,
        max: 5
    },
    dangerLevel: {
        type: Number,
        min: 0,
        max: 10
    }
});

schema.path('content').validate(function (content) {
    return content.length > 20;
}, "Content must be greater than 20 characters");

schema.statics.findReviewsByAnimal = function (animalId) {
    return this.find({})
        .where('animal')
        .equals(animalId)
        .exec();
};

mongoose.model('Review', schema);
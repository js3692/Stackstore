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
    dangerLevel: {
        type: Number,
        min: 0,
        max: 10,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    animal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Animal'
    }
});

reviewSchema.statics.findReviewsByAnimal = function(animalId) {
    return this.find({})
        .where('animal')
        .equals(animalId)
        .exec();
};

mongoose.model('Review', reviewSchema);
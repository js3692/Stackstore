'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    // language: {
    //     type: mongoose.Schema.Types.ObjectId
    // },
    // code: {
    //     type: String
    // },
    animalName: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    },  
    price: {
        type: Number
    },
    description: {
        // Description of product
        type: String
    },
    category: {
        type: [String]
    },
    countryCode: {
        type: [String]
    },
    conservationStatus: {
        type: String,
        enum: ['Near Threatened', 'Vulnerable', 'Endangered', 'Critically Endangered', 'Extinct in the Wild', 'Extinct']
    },
    review: {
        // Reference to a review
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    },
    rating: {
        // average of stars from reviews, default to zero
        type: Number,
        default: 0
    }
});


schema.statics.findByCat = function (categories) {
    var catArr = categories.split(/[\s,]+/);
    return this.find({category: {$in: catArr}});
}

schema.methods.getSimilar = function () {
    var myCat = this.category;
    return this.constructor
    .find({
        _id: {$ne: this._id},
        category: {$in: myCat}
    })
    //.exec()
}











mongoose.model('Animal', schema);
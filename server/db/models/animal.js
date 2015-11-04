'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    // language: {
    //     type: mongoose.Schema.Types.ObjectId
    // },
    // code: {
    //     type: String
    // },
    // GTND: you can just call this name
    animalName: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    },
    price: {
        // GTND: required?
        // GTND: in cents plz
        type: Number
    },
    description: {
        // Description of product
        type: String
    },
    category: {
        // GTND: not enumed? just tags?
        type: [String]
    },
    countryCode: {
        type: [String]
    },
    conservationStatus: {
        type: String,
        enum: ['Near Threatened', 'Vulnerable', 'Endangered', 'Critically Endangered', 'Extinct in the Wild', 'Extinct']
    },
    reviews: {
        // GTND: ref the other way
        // Reference to reviews
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Review'
    },
    rating: {
        // GTND: min/max?
        // GTND: how is this updated? a hook?
        // average of stars from reviews, default to zero
        type: Number,
        default: 0
    }
});

// GTND: cat? a little misleading
// GTND: so categories is a string?
schema.statics.findByCat = function (categories) {
    var catArr = categories.split(/[\s,]+/);
    return this.find({category: {$in: catArr}});
};

schema.methods.getSimilar = function () {
    var myCat = this.category;
    // GTND: what's wrong with this.find?
    return this.constructor
    .find({
        _id: {$ne: this._id},
        category: {$in: myCat}
    });
};


mongoose.model('Animal', schema);

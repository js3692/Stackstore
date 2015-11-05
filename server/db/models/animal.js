'use strict';
var mongoose = require('mongoose');

var animalSchema = new mongoose.Schema({
    // language: {
    //     type: mongoose.animalSchema.Types.ObjectId
    // },
    // code: {
    //     type: String
    // },
    name: {
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
    rating: {
        // average of stars from reviews, default to zero
        type: Number,
        default: 0
    }
});


animalSchema.statics.findByCat = function (categories) {
    var catArr = categories.split(/[\s,]+/);
    return this.find({category: {$in: catArr}});
};

animalSchema.methods.getSimilar = function () {
    var myCat = this.category;
    return this.constructor
    .find({
        _id: {$ne: this._id},
        category: {$in: myCat}
    });
};


mongoose.model('Animal', animalSchema);
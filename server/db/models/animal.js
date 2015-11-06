'use strict';
var mongoose = require('mongoose');

var animalSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    imageUrl: {
        type: String,
        default: 'http://fillmurray.com/g/200/300'
    },
    price: {
        type: Number,
        set: convertFormatToCents,
        required: true
    },
    description: {
        type: String,
        required: true
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
        type: Number,
        min: 1,
        max: 5
    },
    inventoryQuantity: {
        type: Number,
        required: true
    }
});

function convertFormatToCents (priceInDollars) {
    return priceInDollars * 100;
}

animalSchema.set('toObject', { getters: true });
animalSchema.set('toJSON', { getters: true });

animalSchema.virtual('priceUSD').get(function () {
    return (this.price/100).toFixed(2);
});

animalSchema.statics.findByCategories = function (categories) {
    return this.find({ category: { $in: categories } });
};

animalSchema.methods.getSimilar = function () {
    return this.constructor
        .find({
            _id: { $ne: this._id },
            category: { $in: this.category }
        });
};


mongoose.model('Animal', animalSchema);
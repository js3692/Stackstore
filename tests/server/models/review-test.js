var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

var Review = mongoose.model('Review');
var Animal = mongoose.model('Animal');

describe('Review model', function () {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(Review).to.be.a('function');
    });

    describe('on creation', function () {
        var animal;
        beforeEach('Create an animal', function () {
            return Animal.create({
                    name: "lemur",
                    category: ["Dangerous", "Very rare"],
                    price: 200.50,
                    description: "Pet me if you can",
                    rating: 3,
                    inventoryQuantity: 4
                })
                .then(function (newAnimal) {
                    animal = newAnimal;
                });
        });

        afterEach('Destroy animal', function () {
            return Animal.remove({}).then(function () { Review.remove({}); });
        });

        it('content should have more than 20 characters', function() {
            return Review.create({
                    content: "Very short",
                    animal: animal._id
                }).then(null, function(error) {
                    expect(error).to.exist;
                    expect(error.message).to.equal('Review validation failed');
                });
        });
    });

    describe('Static method: ', function () {
        var animal;

        beforeEach('Create an animal', function () {
            return Animal.create({
                    name: "lemur",
                    category: ["Dangerous", "Very rare"],
                    price: 200.50,
                    description: "Pet me if you can",
                    rating: 3,
                    inventoryQuantity: 4
                })
                .then(function (newAnimal) {
                    animal = newAnimal;
                });
        });

        afterEach('Destroy animal', function () {
            return Animal.remove({});
        });

        it('findReviewsByAnimal should find the animal associated with the review', function() {
            return Review.create({
                    content: "Very Looooooooonnnnngggg",
                    animal: animal._id
                }).then(function () {
                    return Review.findReviewsByAnimal(animal._id);
                }).then(function (reviews) {
                    expect(reviews[0].animal.equals(animal._id)).to.be.true;
                });
        });
    });
      
});



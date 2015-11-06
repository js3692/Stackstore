// Require in all models.
var mongoose = require('mongoose');
require('../../../server/db/models');
var Animal = mongoose.model('Animal');
var Review = mongoose.model('Review');

var sinon = require('sinon');
var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');

describe('Animal model', function () {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });
      
    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(Animal).to.be.a('function');
    });

    describe('The animal document on creation', function () {
        it('should save prices in cents', function() {
            return Animal.create({
                    name: "lemur",
                    category: ["Dangerous", "Very rare"],
                    price: 10.99,
                    description: "Pet me!",
                    rating: 3,
                    inventoryQuantity: 4
                })
                .then(function (animal) {
                    expect(animal.price).to.equal(1099);
                });
        });

        it("should not be created if there\'s one with the same name", function() {
            return Animal.create({
                    name: "lemur",
                    category: ["Not Dangerous", "Very common"],
                    price: 11.99,
                    description: "Don't touch!",
                    rating: 1,
                    inventoryQuantity: 2
                })
                .then(null, function (err) {
                    expect(Animal.create).to.throw(err);
                });
        });
    });

    
    describe('Static, instance, virtual methods: ', function() {
        beforeEach('populate Database', function() {
            return Animal.create({
                    name: "lemur",
                    category: ["Dangerous", "Very rare"],
                    price: 10.99,
                    description: "Pet me!",
                    rating: 3,
                    inventoryQuantity: 4
                })
                .then(function() {
                    return Animal.create({
                        name: "Phil Murray",
                        category: ["Human", "Dangerous"],
                        price: 99.99,
                        description: "Don't touch",
                        rating: 2,
                        inventoryQuantity: 1
                    });
                });
        });

        afterEach('Delete created animals for next test', function () {
            return Animal.remove({});
        });

        it('Get price in dollars with priceUSD virtual', function() {
            return Animal.findOne({ name: "lemur" })
                .then(function(lemur) {
                    expect(lemur.price).to.equal(1099);
                    expect(lemur.priceUSD).to.equal('10.99');
                });
        });


        it('findByCategories should find phil murray', function() {
            return Animal.findByCategories(['Very rare'])
                .then(function(animal) {
                    expect(animal[0].name).to.equal('lemur');
                });
        });

        it('getSimilar should find similar animals to phil murray', function() {
            return Animal.findOne({name: 'Phil Murray'})
                .then(function(philM) {
                    return philM.getSimilar();
                }).then(function(animals) {
                    expect(animals[0].name).to.equal('lemur');
                });
        });
    });
});


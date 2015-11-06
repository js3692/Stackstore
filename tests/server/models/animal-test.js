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

    describe('Methods', function() {
        beforeEach('populate Database', function() {        
            return Animal.create({
                    name: "lemur",
                    price: 100,
                    description: 'A mammal that lives in madagascar.',
                    inventoryQuantity: 10,
                    category: ["mammal", "madagascar"]
                })
                .then(function() {
                    return Animal.create({
                        name: "Phil Murray",
                        price: 100, 
                        description: 'His name is Bill, not Phil. He was in some Wes Anderson movies.',
                        inventoryQuantity: 1,
                        category: ["human", "murray", "mammal"]
                    });
                });
        });

        it('class method should find animals by category', function() {
            return Animal.findByCategory('mammal')
            .then(function(animal) {
                expect(animal[0].name).to.equal('lemur');
            });
        });

        it('instance method should find similar animals', function() {
            return Animal.findOne({name: 'Phil Murray'})
                .then(function(philM) {
                    return philM.getSimilar();
                }).then(function(animals) {
                    expect(animals[0].name).to.equal('lemur');
                });
        });
        
        it('price getter should return value in dollars', function() {
            return Animal
                .findOne({ name: 'Phil Murray' })
                .then(function(animal) {
                    expect(Number(animal.priceUSD)).to.equal(100);
                })
        });
    });
});


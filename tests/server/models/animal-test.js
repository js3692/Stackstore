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

    describe('On creation', function () {
        it('should require an Animal name', function() {
            return Animal.create({ price: 1000 })
                .then(null, function(error) {
                    expect(error).to.exist;
                    expect(error.message).to.equal('Animal validation failed');
                });
        });
    });

    describe('reviews', function () {
        var animal;
        var agent = supertest.agent(app);

        beforeEach('create animal', function () {
            return Animal.create({ animalName: 'TestReviewsAnimal' })
                .then(function (createdAnimal) {
                    animal = createdAnimal;
                });
        });
        
        afterEach('destroy animal', function () {
            return Animal.remove({ animalName: 'TestReviewsAnimal' });
        });

        it('reviews property should be an array', function() {
            expect(Array.isArray(animal.reviews)).to.be.true;
        });

        it('the array should contain Review instance ids', function(done) {
            Review.create({
                content: "I'm a dummy review!",
                stars: 5,
                dangerLevel: 3
            })
            .then(function (newReview) {
                agent
                .post('/api/animals/' + animal._id + '/addReview')
                .send(newReview)
                .expect(201)
                .end(function (err, res) {
                    if (err) return done(err);
                    Review.findById(res.body.reviews[0])
                    .then(function (review) {
                        expect(review.content).to.equal("I'm a dummy review!");
                    })
                    done();
                });
            });
        });

    });
    
    describe('Methods', function() {
        beforeEach('populate Database', function() {        
            return Animal.create({
                    animalName: "lemur",
                    category: ["mammal", "madagascar"]
                })
                .then(function() {
                    return Animal.create({
                        animalName: "Phil Murray",
                        category: ["human", "murray", "mammal"]
                    });
                });
        });

        it('should find phil murray', function() {
            return Animal.findByCat('mammal')
            .then(function(animal) {
                expect(animal[0].animalName).to.equal('lemur');
            });
        });

        it('should find similar animals to phil murray', function() {
            return Animal.findOne({animalName: 'Phil Murray'})
                .then(function(philM) {
                    return philM.getSimilar();
                }).then(function(animals) {
                    expect(animals[0].animalName).to.equal('lemur');
                });
        });
    });
});


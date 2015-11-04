var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var supertest = require('supertest');
var app = require('../../../server/app');
var agent = supertest.agent(app);

var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');
var Animal = mongoose.model('Animal');
var Review = mongoose.model('Review');

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

    describe('on creation', function () {
        
        it('should require an Animal name', function() {
            return Animal.create({ description: 'this should fail without an animal name' })
                .then(null, function(error) {
                    expect(error).to.exist;
                    expect(error.message).to.equal('Animal validation failed');
                });
        });
    });

    describe('reviews property', function () {
        var animal;
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

        xit('the array should contain Review instance ids', function() {
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
                    expect(res.body.reviews[0].content).to.equal("I'm a dummy review!");
                    done();
                });
            });
        });

    });
});
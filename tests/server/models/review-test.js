var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

var Review = mongoose.model('Review');

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

        it('should require content', function() {
            return Review.create({ stars: 0 }).then(null, function(error) {
                expect(error).to.exist;
                expect(error.message).to.equal('Review validation failed');
            });
        });
      
        it('should require stars', function() {
            return Review.create({ content: 'I forgot to add stars!' }).then(null, function(error) {
                expect(error).to.exist;
                expect(error.message).to.equal('Review validation failed');
            });
        });
        
        describe('stars field should not allow', function() {
            var myReview = {
                content: 'I\'m going to put the wrong number of stars!'
            };
            
            it('more than 5 stars', function() {
                myReview.stars = 600;
                return Review.create(myReview).then(null, function(error) {
                    expect(error).to.exist;
                    expect(error.message).to.equal('Review validation failed');
                });
            });
            
            it('fewer than 0 stars', function() {
                myReview.stars = -3;
                return Review.create(myReview).then(null, function(error) {
                    expect(error).to.exist;
                    expect(error.message).to.equal('Review validation failed');
                });
            });
        });
    });
});



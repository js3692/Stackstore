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
    });
});



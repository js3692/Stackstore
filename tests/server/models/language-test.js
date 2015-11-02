var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

var Language = mongoose.model('Language');

describe('Language model', function () {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(Language).to.be.a('function');
    });

    describe('on creation', function () {

        it('should require a language name', function() {
            return Language.create({ language: 'Python' }).then(null, function(error) {
                expect(error).to.exist;
                expect(error.message).to.equal('Review validation failed');
            });
        });
    });
});



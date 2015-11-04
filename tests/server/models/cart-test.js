var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

var Cart = mongoose.model('Cart');
var User = mongoose.model('User');

xdescribe('Cart model', function () {
    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(Cart).to.be.a('function');
    });

    describe('on creation', function () {
        
         var createUser = function () {
                 return User.create({ email: 'batman@gmail.com', password: 'robin' });
         };

        it('should require a user', function() {
            return Cart.create({ product: 'Batman' }).then(null, function(error) {
                expect(error).to.exist;
                expect(error.message).to.equal('Cart validation failed');
            });
        });

        it('should require a product', function() {
            return Cart.create({ user: 'Batman' }).then(null, function(error) {
                expect(error).to.exist;
                expect(error.message).to.equal('Cart validation failed');
            });
        });

        it('user property should be an instance of user', function() {
            return Cart.create({ name: "Batman", user: {words: "HELLO"}}).then(null, function(error) {
                expect(error).to.exist;
                expect(error.message).to.equal('Cart validation failed');
            })
        });
    });
});



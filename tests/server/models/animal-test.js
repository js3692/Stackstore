var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

var Animal = mongoose.model('Animal');

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
            return Animal.create({ description: 'this should fail without an animal name' }).then(null, function(error) {
                expect(error).to.exist;
                expect(error.message).to.equal('Animal validation failed');
            });
        });


    	describe('reviews property', function () {
    		var animal;

    		beforeEach('create animal', function () {
    			return Animal.create({ animalName: 'TestReviewsAnimal'}).then(function (createdAnimal) {
    				animal = createdAnimal;
    			})

    		})

    		afterEach('destroy animal', function () {
    			return Animal.remove({animalName: 'TestReviewsAnimal'})
    		})

	        it('reviews property should be an array', function() {
	            expect(Array.isArray(animal.reviews)).to.be.true;
	        });

			it('the array should contain Review instance ids', function() {
	            return Review.create({content: 'fake content', stars: 5, dangerLevel: 10}).then(function (newReview) {
	            	animal.reviews.push(newReview._id);
	            	expect
	            })



	            return Animal.create({ name: "Batman", user: {words: "HELLO"}}).then(null, function(error) {
	                expect(error).to.exist;
	                expect(error.message).to.equal('Cart validation failed');
	            })
	        });
        })











    });
});
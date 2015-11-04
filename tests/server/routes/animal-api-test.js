// Instantiate all models
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
require('../../../server/db/models');
var Animal = mongoose.model('Animal');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');

describe('Animal Route', function () {

	beforeEach('Establish DB connection', function (done) {
		if (mongoose.connection.db) return done();
		mongoose.connect(dbURI, done);
	});

	afterEach('Clear test database', function (done) {
		clearDB(done);
	});

//	describe('Unauthenticated request', function () {
//
//		var guestAgent;
//
//		beforeEach('Create guest agent', function () {
//			guestAgent = supertest.agent(app);
//		});
//
//		it('should get a 401 response', function (done) {
//			guestAgent.get('/api/members/secret-stash')
//				.expect(401)
//				.end(done);
//		});
//	});

	describe('Get all products', function () { 
		var agent;

		var productInfo = {
			code: '/[aeiou]/',
			rating: 0,
            description: 'Regex for finding vowels'
		};

		beforeEach('Create a product', function () {
			return Product.create(productInfo).catch(function(error) {
                console.log(error);
            });
		});

		beforeEach('Create user agent', function (done) {
			agent = supertest.agent(app);
            done();
//			agent.post('/login').send(productInfo).end(done);
		});

		it('should get with 200 response and with an array as the body', function (done) {
			agent.get('/api/products').expect(200).end(function (err, response) {
				if (err) return done(err);
				expect(response.body).to.be.an('array');
                expect(response.body[0].code).to.equal('/[aeiou]/');
				done();
			});
		});

	});

});

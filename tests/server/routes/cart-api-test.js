// Instantiate all models
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
require('../../../server/db/models');
var Cart = mongoose.model('Cart');
var Animal = mongoose.model('Animal');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');

describe('Cart Route', function () {
  
  var agent,
      baseUrl = '/api/cart/';

  beforeEach('Establish DB connection', function (done) {
      if (mongoose.connection.db) return done();
      mongoose.connect(dbURI, done);
  });

  beforeEach('Create agent', function (done) {
      agent = supertest.agent(app);
      done();
  });

  var animal;
  var animalInfo = {
      animalName: 'Emu',
      rating: 0.1,
      description: 'Likes to kick. Is a bird.'
  };
  beforeEach('Create an animal', function () {
      return Animal.create(animalInfo).then(function(newAnimal) {
        animal = newAnimal;
      }).catch(function(error) {
          console.log(error);
      });
  });

  afterEach('Clear test database', function (done) {
      clearDB(done);
  });

  describe('User is NOT logged in', function () {
    it('req.session.cart does NOT exist yet', function () {});
    it('req.session.cart DOES exist', function () {});
  });
  describe('User IS logged in', function () {
    it('req.session.cart does NOT exist yet', function () {});
    it('req.session.cart DOES exist', function () {});
  });

  describe('GET request returns the right cart', function () {});
  describe('PUT request adds the correct animal', function () {
    it('When one animal is added', function () {});
    it('When three animals are added', function () {});
  });
  describe('DELETE request removes the correct animal from cart', function () {});



  describe('Get all animals', function () { 
    
      it('should get with 200 response with an array as the body', function (done) {
          agent.get(baseUrl).expect(200).end(function (err, response) {
              if (err) return done(err);
              expect(response.body).to.be.an('array');
              expect(response.body[0].description).to.equal('Likes to kick. Is a bird.');
              done();
          });
      });

  });
  
  describe('Create an animal', function() {
      it('should get a 201 response with an animal as the body', function (done) {
          agent
            .post(baseUrl)
            .send(animalInfo)
            .expect(201)
            .end(function (err, response) {
              if (err) return done(err);
              expect(response.body).to.be.an('object');
              expect(response.body.description).to.equal('Likes to kick. Is a bird.');
              done();
          });
      });
  });
  
  describe('Get animal by id', function() {
      it('should get a 200 response with an animal as the body', function(done) {
        agent
          .get(baseUrl + animal._id)
          .expect(200)
          .end(function (err, response) {
            if (err) return done(err);
            expect(response.body).to.be.an('object');
            expect(response.body.description).to.equal('Likes to kick. Is a bird.');
            done();
        });
      });
  });
  
  describe('Update an animal', function() {
    it('should get a 200 response with an animal as the body', function(done) {
      animalInfo.rating = 0.4;
      animalInfo.price = 2000;
      agent
        .put(baseUrl + animal._id)
        .send(animalInfo)
        .expect(200)
        .end(function(err, response) {
          if (err) return done(err);
          expect(response.body).to.be.an('object');
          expect(response.body.rating).to.equal(0.4);
          expect(response.body.price).to.equal(2000);
          done();
      })
    })
  
  })

    
    
});

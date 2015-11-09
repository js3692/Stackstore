// Instantiate all models
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
require('../../../server/db/models');

var Animal = mongoose.model('Animal');
var Review = mongoose.model('Review');
var User = mongoose.model('User');

var expect = require('chai').expect;
var _ = require('lodash');

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');

describe('Animal Route', function () {
  
  var agent,
      nonAdminLoggedInAgent,
      adminLoggedInAgent,
      baseUrl = '/api/animals/';


  beforeEach('Establish DB connection', function (done) {
      if (mongoose.connection.db) return done();
      mongoose.connect(dbURI, done);
  });

  afterEach('Clear test database', function (done) {
      clearDB(done);
  });

  beforeEach('Create guest agent', function (done) {
    agent = supertest.agent(app);
    done();
  });

  beforeEach('Create non-Admin Agent and log him in', function (done) {
    User.create({
      email: 'john@gmail.com',
      password: 'shoopdawoop'
    })
    .then(function () {
      nonAdminLoggedInAgent = supertest.agent(app);
      nonAdminLoggedInAgent.post('/login').send({
        email: 'john@gmail.com',
        password: 'shoopdawoop'
      }).end(done);
    }).catch(done);
  });

  beforeEach('Create Admin Agent and log him in', function (done) {
    User.create({
      email: 'joe@gmail.com',
      password: 'shoopdawoop',
      isAdmin: true
    })
    .then(function () {
      adminLoggedInAgent = supertest.agent(app);
      adminLoggedInAgent.post('/login').send({
        email: 'joe@gmail.com',
        password: 'shoopdawoop'
      }).end(done);
    }).catch(done);
  });
  
  afterEach('Destroy user after use', function () {
    return User.remove({});
  });

  var animalInfo = {
    name: 'Emu',
    price: 30.99,
    description: 'Likes to kick. Is a bird.',
    inventoryQuantity: 3
  };

  var animal;

  describe('Get all animals', function () {

    beforeEach('Create an animal', function () {
      return Animal.create(animalInfo).then(function (newAnimal) {
        animal = newAnimal;
      }).catch(console.error);
    });

    afterEach('Destroy animal after use', function () {
      return Animal.remove({});
    });
    
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
    afterEach('Destroy animal after use', function () {
      return Animal.remove({});
    });

    it('should get a 201 response with an animal as the body if user is Admin', function (done) {
        adminLoggedInAgent
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
    beforeEach('Create an animal', function () {
      return Animal.create(animalInfo).then(function (newAnimal) {
        animal = newAnimal;
      }).catch(console.error);
    });

    afterEach('Destroy animal after use', function () {
      return Animal.remove({});
    });

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
    beforeEach('Create an animal', function () {
      return Animal.create(animalInfo).then(function (newAnimal) {
        animal = newAnimal;
      }).catch(console.error);
    });

    afterEach('Destroy animal after use', function () {
      return Animal.remove({});
    });

    it('should get a 200 response with an animal as the body', function(done) {
      animalInfo.rating = 2;
      animalInfo.price = 2000;
      Animal.update(animalInfo).then(function (newAnimal) {
        adminLoggedInAgent
          .put(baseUrl + animal._id)
          .send(animalInfo)
          .expect(200)
          .end(function(err, response) {
            if (err) return done(err);
            expect(response.body).to.be.an('object');
            expect(response.body.rating).to.equal(2);
            expect(response.body.priceUSD).to.equal('2000.00');
            done();
        });
      }).catch(done);
    });
  
  });
  
  describe('Adding reviews to an animal', function() {
    var animal;
    var fakeReview = {
      content: "I'm a dummy review, but must be greater than 20 characters",
      stars: 5,
      dangerLevel: 3
    };

    beforeEach('Create an animal', function () {
      return Animal.create(animalInfo).then(function (newAnimal) {
        animal = newAnimal;
      }).catch(console.error);
    });

    afterEach('Destroy animal after use', function () {
      return Animal.remove({});
    });

    afterEach('Delete reviews', function () {
      return Review.remove({});
    });
    
    it('should get a 201 response', function (done) {
      nonAdminLoggedInAgent
        .post(baseUrl + animal._id + '/reviews')
        .send(fakeReview)
        .expect(201)
        .end(done);
    });

    it('should return the new review in the response body', function (done) {
      nonAdminLoggedInAgent
        .post(baseUrl + animal._id + '/reviews')
        .send(fakeReview)
        .expect(201)
        .end(function (err, res) {
          if (err) done(err);
          expect(animal._id.equals(res.body.animal)).to.be.true;
          done();
        });
    });

  });
    
    
});
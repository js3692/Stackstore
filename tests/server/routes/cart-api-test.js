// Instantiate all models
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
require('../../../server/db/models');
var Cart = mongoose.model('Cart');
var User = mongoose.model('User');
var Animal = mongoose.model('Animal');

var expect = require('chai').expect;
var sinon = require('sinon');

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');

describe('Cart Route: ', function () {
  
  var baseUrl = '/api/cart/';

  beforeEach('Establish DB connection', function (done) {
      if (mongoose.connection.db) return done();
      mongoose.connect(dbURI, done);
  });

  afterEach('Clear test database', function (done) {
      clearDB(done);
  });

  xdescribe('When user is NOT logged in', function () {
    var guestAgent;
    beforeEach('Create guest agent', function () {
      guestAgent = supertest.agent(app);
    });

    it('and if req.session.cart does NOT exist yet, new cart should be created', function (done) {
      guestAgent
        .get(baseUrl)
        .expect(200)
        .end(function (err, res) {
          if (err) done(err);
          expect(res.body).to.contain.all.keys(['_id', 'animals']);
          done();
        });
    });

    it('and if req.session.cart DOES exist, cart is not initialized AGAIN', function (done) {
      guestAgent.get(baseUrl).expect(200).end(function (err, res) {
        if (err) done(err);
        var cart = res.body;
        guestAgent
          .get(baseUrl)
          .expect(200)
          .end(function (err, res) {
            if (err) done(err);
            expect(res.body._id).to.equal(cart._id);
            done();
          });
      });
    });

  });

  xdescribe('When user IS logged in', function () {
    var loggedInAgent;

    var userInfo = {
      email: 'joe@gmail.com',
      password: 'shoopdawoop'
    };

    var user;

    beforeEach('Create a user', function (done) {
      User.create(userInfo, done);
    });

    beforeEach('Create loggedIn user agent and authenticate', function (done) {
      loggedInAgent = supertest.agent(app);
      loggedInAgent.post('/login').send(userInfo).end(function (err, res) {
        if(err) done(err);
        user = res.body;
        done();
      });
    });

    it('and if req.session.cart does NOT exist yet, new cart should be created', function (done) {
      loggedInAgent
        .get(baseUrl)
        .expect(200)
        .end(function (err, res) {
          if (err) done(err);
          expect(res.body).to.contain.all.keys(['_id', 'animals']);
          expect(res.body.user._id).to.equal(user._id);
          done();
        });
    });

    it('and if req.session.cart DOES exist, cart is not initialized AGAIN', function (done) {
      loggedInAgent.get(baseUrl).expect(200).end(function (err, res) {
        if (err) done(err);
        var cart = res.body;
        loggedInAgent
          .get(baseUrl)
          .expect(200)
          .end(function (err, res) {
            if (err) done(err);
            expect(res.body._id).to.equal(cart._id);
            done();
          });
      });
    });

  });

  describe('PUT request adds the correct animal', function () {
    var animalA, animalB;
    var animalInfoA = {
      name: 'Emu',
      rating: 0.1,
      description: 'Likes to kick. Is a bird.'
    };
    var animalInfoB = {
      name: 'Whaleshark',
      rating: 4.9,
      description: 'Likes to kick. Is a shark. Maybe a whale.'
    };

    var guestAgent;

    beforeEach('Create guest agent', function () {
      guestAgent = supertest.agent(app);
    });

    beforeEach('Create animals', function (done) {
      return Animal.create(animalInfoA).then(function(newAnimal) {
        animalA = newAnimal;
      })
      .then(function() {
        return Animal.create(animalInfoB);
      })
      .then(function (newAnimal) {
        animalB = newAnimal;
        done();
      })
      .catch(done);
    });

    it('When one animal is added', function (done) {
      guestAgent.get(baseUrl).expect(200).end(function (err, res) {
        if (err) done(err);
        guestAgent
          .put(baseUrl)
          .send({ animal: animalA._id, quantity: 1 })
          .expect(201)
          .end(function (err, res) {
            if (err) done(err);
            expect(res.body.animals.length).to.equal(1);
            expect(animalA._id.equals(res.body.animals[0])).to.be.true;
            done();
          });
      });
    });

    it('When three animals are added', function (done) {
      guestAgent.get(baseUrl).expect(200).end(function (err, res) {
        if (err) done(err);
        guestAgent.put(baseUrl).send({ animal: animalA._id, quantity: 2 }).expect(201)
        .end(function (err, res) {
          if (err) done(err);
          guestAgent.put(baseUrl).send({ animal: animalB._id, quantity: 1 }).expect(201)
          .end(function (err, res) {
            if (err) done(err);
            expect(res.body.animals.length).to.equal(3);
            expect(animalA._id.equals(res.body.animals[0])).to.be.true;
            expect(animalA._id.equals(res.body.animals[1])).to.be.true;
            expect(animalB._id.equals(res.body.animals[2])).to.be.true;
            done();
          });
        });

      });


    });
  });

  describe('DELETE request removes the correct animal from cart', function () {
    var animal;
    var animalInfo = {
      name: 'Emu',
      rating: 0.1,
      description: 'Likes to kick. Is a bird.'
    };

    var guestAgent;

    beforeEach('Create guest agent', function () {
      guestAgent = supertest.agent(app);
    });

    beforeEach('Create animals', function (done) {
      return Animal.create(animalInfo).then(function(newAnimal) {
        animal = newAnimal;
        done();
      })
      .catch(done);
    });

    it('When one animal is added and deleted', function (done) {
      guestAgent.get(baseUrl).expect(200).end(function (err, res) {
        if (err) done(err);
        guestAgent
          .put(baseUrl)
          .send({ animal: animal._id, quantity: 1 })
          .expect(201)
          .end(function (err, res) {
            if (err) done(err);
            expect(res.body.animals.length).to.equal(1);
            expect(animal._id.equals(res.body.animals[0])).to.be.true;
            guestAgent
              .delete(baseUrl)
              .send({ id: animal._id })
              .expect(200)
              .end(function (err, res) {
                if (err) done(err);
                expect(res.body.animals.length).to.equal(0);
                done();
              });
          });
      });
    });


  });
    
});

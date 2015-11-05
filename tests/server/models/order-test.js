var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');
var Promise = require('bluebird');
mongoose.Promise = Promise;


// Require in all models.
require('../../../server/db/models');

var Order = mongoose.model('Order');
var User = mongoose.model('User');
var Animal = mongoose.model('Animal');

describe('Order model', function () {
    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    var user, animalA, animalB;

    beforeEach('Create user (the customer) and animals', function () {
      var AnimalsPromises = [
        Animal.create({
          name: "lemur",
          category: ["Dangerous", "Very rare"],
          imageUrl: "www.google.com/billmurray",
          price: 20000,
          description: "Pet me if you can",
          countryCoude: ['US'],
          conservationStatus: "Endangered",
          rating: 3,
          inventoryQuantity: 4
        }),
        Animal.create({
          name: "Phil Murray",
          category: ["human", "murray", "mammal"],
          imageUrl: "www.google.com/billmurray",
          description: "Pet me if you can",
          price: 30000,
          countryCoude: ['CH'],
          rating: 3.4,
          inventoryQuantity: 4
        })
      ];
      return Promise.all(AnimalsPromises)
        .spread(function (lemur, phil) {
          animalA = lemur.toObject();
          animalB = phil.toObject();
          return User.create({ email: 'batman@gmail.com', password: 'robin' });
        })
        .then(function (newUser) {
          user = newUser;
        });
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(Order).to.be.a('function');
    });

    describe('on creation', function () {

      var orderA, orderB;


      beforeEach('Create two orders', function(done) {
        Order.create({
          user: user._id,
          total: 20000,
          animals: [animalA],
          date: new Date(),
          shippingAddr: "5 Hanover Square"
        })
        .then(function (order) {
          orderA = order;
          return Promise.delay(1000)
            .then(function () {
              return Order.create({
                  user: user._id,
                  animals: [animalB],
                  total: 30000,
                  date: Date.now(),
                  shippingAddr: "5 Hanover Square"
                });
            });
        })
        .then(function (order) {
          orderB = order;
          done();
        }).catch(done);
      });
      
      it('getAllOrders should get all orders sorted by date (DESC)', function() {
        return Order.getAllOrders(user._id)
          .then(function(orders) {
            expect(orders.length).to.equal(2);
            expect(orders[0].date).to.be.above(orders[1].date);
          });
      });
      
    });
});



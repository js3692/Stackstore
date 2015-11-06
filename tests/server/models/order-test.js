var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var expect = require('chai').expect;
var mongoose = require('mongoose');
var Promise = require('bluebird');
mongoose.Promise = Promise;


// Require in all models.
require('../../../server/db/models');

var Order = mongoose.model('Order');
var User = mongoose.model('User');
var Animal = mongoose.model('Animal');
var Item = mongoose.model('Item');

describe('Order model', function () {
    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    var user, animalA, animalB, itemA, itemB;

    beforeEach('Create user (the customer) and animals', function () {
      var AnimalsPromises = [
        Animal.create({
          name: "lemur",
          category: ["Dangerous", "Very rare"],
          price: 200.50,
          description: "Pet me if you can",
          rating: 3,
          inventoryQuantity: 4
        }),
        Animal.create({
          name: "Phil Murray",
          category: ["human", "murray", "mammal"],
          description: "Pet me if you can",
          price: 300.50,
          rating: 3.4,
          inventoryQuantity: 4
        })
      ];
      return Promise.all(AnimalsPromises)
        .spread(function (lemur, phil) {
          animalA = lemur;
          animalB = phil;
          return Item.create({ animal: animalA, quantity: 2 });
        })
        .then(function (newItem) {
          itemA = newItem;
          return Item.create({ animal: animalB });
        })
        .then(function (newItem) {
          itemB = newItem;
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


      beforeEach('Create two orders', function (done) {
        Order.create({ // ==> Create the first order with two animals
          user: user._id,
          items: [itemA._id, itemB._id],
          date: new Date(),
          shippingAddr: "5 Hanover Square"
        })
        .then(function (order) {
          orderA = order;
          return Promise.delay(1000)
            .then(function () {
              return Order.create({ // ==> Create another order with one animal, 1 sec behind
                  user: user._id,
                  animals: [itemB._id],
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

      afterEach('Delete those orders', function () {
        return Order.remove({});
      });

      it('total should have been saved correctly', function () {
        expect(orderA.total).to.not.equal(70150);
        expect(orderA.total).to.equal((701.5).toFixed(2));
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



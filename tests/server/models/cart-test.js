var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');
var Promise = require('bluebird');
mongoose.Promise = Promise;


// Require in all models.
require('../../../server/db/models');

var Cart = mongoose.model('Cart');
var Item = mongoose.model('Item');
var User = mongoose.model('User');
var Animal = mongoose.model('Animal');

describe('Cart model', function () {

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

    describe('Instance methods: ', function () {

      var user,
          cart,
          lemurId,
          philId,
          itemA,
          itemB;
      
      beforeEach('create a cart', function() {
        var userAndAnimalsPromises = [
          User.create({
            email: 'batman@gmail.com',
            password: 'robin'
          }),
          Animal.create({
            name: "lemur",
            category: ["mammal", "madagascar"],
            price: 10.99,
            description: "I like to eat red chicken",
            rating: 3,
            inventoryQuantity: 4
          }),
          Animal.create({
              name: "Phil Murray",
              category: ["human", "murray", "mammal"],
              price: 11.99,
              description: "I like to eat blue chicken",
              rating: 2,
              inventoryQuantity: 1
          })
        ];
        return Promise.all(userAndAnimalsPromises)
          .spread(function(newUser, lemur, phil) {
            user = newUser;
            lemurId = lemur._id;
            philId = phil._id;
            return Item.create({
                animal: lemur,
                quantity: 3
              })
              .then(function (newItem) {
                itemA = newItem;
                return Item.create({
                  animal: phil // ==> quantity defaults to 1
                });
              });
          }).then(function (newItem) {
            itemB = newItem;
            return Cart.create({
              user: user._id,
              items: [itemA._id, itemB._id]
            });
          }).then(function (newCart) {
            cart = newCart;
          });
      });

      afterEach('delete everything for next test', function () {
        return Cart.remove({})
          .then(function () { Item.remove({}); })
          .then(function () { Animal.remove({}); });
      });
      
      it('deleteItem should delete one item from the cart', function() {
        return cart.deleteItem(itemA._id)
          .then(function(updatedCart) {
            expect(updatedCart.items.length).to.equal(1);
            expect(updatedCart.items[0]).to.equal(itemB._id);
        });
      });

      it('addItem should add one item to the cart', function() {
        return cart.addItem(itemA._id)
          .then(function(updatedCart) {
            expect(updatedCart.items.length).to.equal(3);
            expect(updatedCart.items[2]).to.equal(itemA._id);
        });
      });
      
    });
});


